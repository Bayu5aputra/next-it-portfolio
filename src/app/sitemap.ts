import { baseURL, routes as routesConfig } from "@/resources";
import { getPosts } from "@/utils/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs: MetadataRoute.Sitemap = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const works: MetadataRoute.Sitemap = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes: MetadataRoute.Sitemap = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.9,
  }));

  return [...routes, ...blogs, ...works];
}
