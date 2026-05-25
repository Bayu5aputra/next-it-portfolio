import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, model = "google/gemini-2.5-flash" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' array is required." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "API Key Missing",
          message:
            "The server-side OPENROUTER_API_KEY environment variable is not configured. Please add your key in Vercel or locally in .env.local, or use the Settings panel in the chat widget to enter your key directly.",
        },
        { status: 503 },
      );
    }

    // Official OpenRouter Client SDK — https://openrouter.ai/docs/quickstart#using-the-client-sdks
    const client = new OpenRouter({
      apiKey,
      httpReferer: "https://portfolio.next-it.my.id",
      appTitle: "Bayu Saputra Portfolio Assistant",
    });

    const completion = await client.chat.send({
      chatRequest: {
        model,
        messages,
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

    // Extract meaningful error message from SDK errors
    const errorMessage =
      err?.message || err?.error?.message || "An unexpected server error occurred.";
    const statusCode = err?.status || err?.statusCode || 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
