import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person } from "@/resources";
import { Column, Heading, Schema } from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const image = `/api/og/generate?title=${encodeURIComponent(blog.title)}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: blog.path },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${baseURL}${blog.path}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [image],
    },
  };
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
