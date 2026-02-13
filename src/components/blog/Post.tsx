"use client";

import { PixelTransition } from "@/components/PixelTransition";
import { person } from "@/resources";
import type { PostData } from "@/utils/utils";
import { formatDate } from "@/utils/formatDate";
import { Avatar, Card, Column, Row, Text } from "@once-ui-system/core";

interface PostProps {
  post: PostData;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "var(--radius-l)", // Approximation of radius="l"
            overflow: "hidden",
            border: "1px solid var(--neutral-alpha-weak)", // Approximation of border="neutral-alpha-weak"
          }}
        >
          <PixelTransition
            src={post.metadata.image}
            alt={`Thumbnail of ${post.metadata.title}`}
            gridSize={12}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Text>
          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {post.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
