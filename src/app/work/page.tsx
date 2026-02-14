import { Projects } from "@/components/work/Projects";
import { about, baseURL, person, work } from "@/resources";
import { Column, Heading, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const image = `/api/og/generate?title=${encodeURIComponent(work.title)}`;
  return {
    title: work.title,
    description: work.description,
    alternates: { canonical: work.path },
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${baseURL}${work.path}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: work.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.description,
      images: [image],
    },
  };
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}
