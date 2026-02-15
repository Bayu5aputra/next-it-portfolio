import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import { baseURL, dataStyle, effects, fonts, home, style } from "@/resources";
import ClientLayout from "./ClientLayout";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070B",
};

export async function generateMetadata(): Promise<Metadata> {
  const title = home.title;
  const description = home.description;
  const siteName = "Bayu Saputra Portfolio";
  const keywords = [
    "IT Infrastructure Engineer",
    "Network Engineer Indonesia",
    "IoT Infrastructure",
    "Network Troubleshooting",
    "Cisco",
    "MikroTik",
    "Observability",
    "SRE",
    "Portfolio IT",
    "Bayu Saputra",
  ];

  return {
    metadataBase: new URL(baseURL),
    title,
    description,
    applicationName: siteName,
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": `${baseURL}/api/rss`,
      },
    },
    keywords,
    category: "technology",
    openGraph: {
      type: "website",
      url: baseURL,
      title,
      description,
      siteName,
      locale: "en_US",
      images: [{ url: home.image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [home.image],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: "Bayu Saputra", url: `${baseURL}/about` }],
    creator: "Bayu Saputra",
    publisher: "Bayu Saputra",
    verification: {
      google: "0_XdOOd5v15deDtUtoUwoKqJwo5h9nwHKyMY4IAJZEo",
    },
    icons: {
      icon: "/icon.jpg",
      apple: "/apple-icon.jpg",
    },
    other: {
      "geo.region": "ID-JB",
      "geo.placename": "Bekasi",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout fonts={fonts} style={style} dataStyle={dataStyle} effects={effects}>
      {children}
    </ClientLayout>
  );
}
