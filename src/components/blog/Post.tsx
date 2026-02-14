"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import type { PostData } from "@/utils/utils";
import { Avatar, Column, Row, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: PostData;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <SpotlightCard
      className="fill-width"
      key={post.slug}
      as={Link}
      href={`/blog/${post.slug}`}
      spotlightColor="var(--brand-solid-strong)"
      noPadding
    >
      <Column fillWidth gap="0">
        {post.metadata.image && thumbnail && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.metadata.image}
              alt={`Thumbnail of ${post.metadata.title}`}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <Row fillWidth padding="l" gap="m">
          <Column maxWidth={28} gap="20" vertical="center">
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
      </Column>
    </SpotlightCard>
  );
}
