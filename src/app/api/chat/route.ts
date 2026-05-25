import { getPosts } from "@/utils/utils";
import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
}

// Fallback to direct Google Gemini API call
async function callGeminiDirect(
  messages: Message[],
  model: string,
  apiKey: string,
): Promise<unknown> {
  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  // Format contents for Gemini API (roles must be 'user' or 'model')
  const contents = conversationMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  interface GeminiPayload {
    contents: typeof contents;
    systemInstruction?: {
      parts: { text: string }[];
    };
    generationConfig?: {
      maxOutputTokens?: number;
    };
  }

  const payload: GeminiPayload = {
    contents,
  };

  if (systemMessage) {
    payload.systemInstruction = {
      parts: [{ text: systemMessage.content }],
    };
  }

  payload.generationConfig = {
    maxOutputTokens: 1000,
  };

  // Extract base model name: e.g. "google/gemini-2.5-flash" -> "gemini-2.5-flash"
  let baseModel = model.includes("/") ? model.split("/")[1] : model;
  if (!baseModel.startsWith("gemini")) {
    baseModel = "gemini-2.5-flash"; // Default to a valid Gemini model for direct Google fallback
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${baseModel}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini Direct API Failed: ${errText}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

  // Convert response to OpenAI-compatible structure for the frontend
  return {
    choices: [
      {
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  };
}

export async function POST(request: Request) {
  let messages: Message[] = [];
  let model = "nvidia/nemotron-3-super-120b-a12b:free";

  try {
    const body = await request.json();
    messages = body.messages;
    model = body.model || "nvidia/nemotron-3-super-120b-a12b:free";

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' array is required." },
        { status: 400 },
      );
    }

    // Hardcoded production active domain URL as requested by user
    const domainUrl = "https://portfolio.next-it.my.id";

    // Read and scrape works/projects on this domain dynamically
    let projectsInfo = "";
    try {
      const projects = getPosts(["src", "app", "work", "projects"]);
      projectsInfo = projects
        .map(
          (p) =>
            `- Title: "${p.metadata.title}"\n  Summary: ${p.metadata.summary || "No description."}\n  Link: ${domainUrl}/work/${p.slug}\n  Tag/Category: ${p.metadata.tag || "IT"}`,
        )
        .join("\n\n");
    } catch (e) {
      console.error("Scraping dynamic work projects failed:", e);
    }

    // Read and scrape blog posts on this domain dynamically
    let blogsInfo = "";
    try {
      const blogs = getPosts(["src", "app", "blog", "posts"]);
      blogsInfo = blogs
        .map(
          (b) =>
            `- Title: "${b.metadata.title}"\n  Summary: ${b.metadata.summary || "No summary."}\n  Link: ${domainUrl}/blog/${b.slug}\n  Published: ${b.metadata.publishedAt || "Recently"}`,
        )
        .join("\n\n");
    } catch (e) {
      console.error("Scraping dynamic blog posts failed:", e);
    }

    // Read and scrape GitHub repositories dynamically
    let githubInfo = "";
    try {
      const gitResponse = await fetch(
        "https://api.github.com/users/bayu5aputra/repos?sort=updated&per_page=10",
        {
          headers: {
            "User-Agent": "Bayu-Saputra-Portfolio-Assistant",
          },
        },
      );
      if (gitResponse.ok) {
        const repos = (await gitResponse.json()) as GitHubRepo[];
        githubInfo = repos
          .map(
            (r) =>
              `- Name: "${r.name}"\n  Description: ${r.description || "No description."}\n  Language: ${r.language || "Unknown"}\n  Link: ${r.html_url}\n  Stars: ${r.stargazers_count}`,
          )
          .join("\n\n");
      }
    } catch (e) {
      console.error("Scraping GitHub repositories failed:", e);
    }

    // Inject the dynamically scraped details into the system instruction prompt
    const systemIndex = messages.findIndex((m) => m.role === "system");
    if (systemIndex !== -1) {
      messages[systemIndex].content = `${messages[systemIndex].content}

Domain & Scraping Context:
- Active Domain: ${domainUrl}

Dynamically Scraped Works & Projects (${domainUrl}/work):
${projectsInfo || "No work projects found."}

Dynamically Scraped Blog Posts (${domainUrl}/blog):
${blogsInfo || "No blog posts found."}

Dynamically Scraped GitHub Repositories (https://github.com/bayu5aputra):
${githubInfo || "No GitHub repositories found."}

Scraping Instructions:
- You have dynamically scraped the website files and GitHub repositories in real-time.
- If asked about projects, works, blog logs, or GitHub repositories, list them using their exact title/name and description/summary. Always provide their correct absolute Markdown link so the user can click them directly (e.g. "[Link Text](${domainUrl}/work/project-slug)" or "[Repo Name](repo-html-url)").`;
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      // If OpenRouter Key is missing, try immediate direct Gemini fallback
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (geminiApiKey) {
        console.warn("OPENROUTER_API_KEY missing, using direct Gemini fallback...");
        const fallbackCompletion = await callGeminiDirect(messages, model, geminiApiKey);
        return NextResponse.json(fallbackCompletion);
      }

      return NextResponse.json(
        {
          error: "API Key Missing",
          message:
            "The server-side OPENROUTER_API_KEY environment variable is not configured. Please add your key in Vercel or locally in .env.local, or use the Settings panel in the chat widget to enter your key directly.",
        },
        { status: 503 },
      );
    }

    // Official OpenRouter Client SDK
    const client = new OpenRouter({
      apiKey,
      httpReferer: "https://portfolio.next-it.my.id",
      appTitle: "Bayu Saputra Portfolio Assistant",
    });

    const completion = await client.chat.send({
      chatRequest: {
        model,
        messages,
        maxTokens: 1000,
      },
    });

    return NextResponse.json(completion);
  } catch (error) {
    const err = error as Error & {
      error?: { message?: string };
      status?: number;
      statusCode?: number;
    };
    console.error("Chat API route error:", err);

    // Fallback to direct Gemini API if key is provided
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      console.warn("OpenRouter failed/limited. Falling back to direct Google Gemini API...");
      try {
        const fallbackCompletion = await callGeminiDirect(messages, model, geminiApiKey);
        return NextResponse.json(fallbackCompletion);
      } catch (fallbackError) {
        console.error("Gemini direct fallback failed:", fallbackError);
      }
    }

    // Extract meaningful error message from SDK errors
    const errorMessage =
      err?.message || err?.error?.message || "An unexpected server error occurred.";
    const statusCode = err?.status || err?.statusCode || 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
