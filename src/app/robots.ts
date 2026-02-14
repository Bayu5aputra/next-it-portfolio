import { baseURL } from "@/resources";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: ["PerplexityBot", "ClaudeBot", "anthropic-ai"],
        allow: "/",
      },
    ],
    host: baseURL,
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
