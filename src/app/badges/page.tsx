import { BadgesGrid } from "@/components/badges/BadgesGrid";
import { badges, baseURL, person } from "@/resources";
import { Column, Heading, Line, Row, Schema, Text } from "@once-ui-system/core";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const image = `/api/og/generate?title=${encodeURIComponent(badges.title)}`;
  return {
    title: badges.title,
    description: badges.description,
    alternates: { canonical: badges.path },
    openGraph: {
      title: badges.title,
      description: badges.description,
      url: `${baseURL}${badges.path}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: badges.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: badges.title,
      description: badges.description,
      images: [image],
    },
  };
}

export default function Badges() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={badges.title}
        description={badges.description}
        path={badges.path}
        image={`/api/og/generate?title=${encodeURIComponent(badges.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${badges.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Row fillWidth paddingRight="64">
        <Line maxWidth={48} />
      </Row>

      <Column fillWidth gap="8" paddingX="l">
        <Heading variant="display-strong-xs" wrap="balance">
          {badges.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {badges.description}
        </Text>
      </Column>

      <BadgesGrid items={badges.items} />

      <Row fillWidth paddingLeft="64" horizontal="end">
        <Line maxWidth={48} />
      </Row>
    </Column>
  );
}
