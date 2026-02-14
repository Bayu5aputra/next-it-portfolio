import { baseURL } from "@/resources";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bayu Saputra - IT Infrastructure Engineer Portfolio",
    short_name: "Bayu Portfolio",
    description:
      "Portfolio of an IT Infrastructure Engineer specializing in network reliability, observability, and IoT operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070B",
    theme_color: "#05070B",
    lang: "en",
    scope: "/",
    id: `${baseURL}/`,
    icons: [
      {
        src: "/icon.jpg",
        sizes: "1080x1080",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "1080x1080",
        type: "image/jpeg",
      },
    ],
  };
}
