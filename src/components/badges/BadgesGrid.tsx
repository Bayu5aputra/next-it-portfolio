"use client";

import SpotlightCard from "@/components/SpotlightCard";
import type { Badges } from "@/types";
import { Badge, Button, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import styles from "./BadgesGrid.module.scss";

type BadgeItem = Badges["items"][number];

interface BadgesGridProps {
  items: BadgeItem[];
}

export function BadgesGrid({ items }: BadgesGridProps) {
  return (
    <Grid columns="2" s={{ columns: 1 }} fillWidth gap="16" marginBottom="40">
      {items.map((badge) =>
        badge.link ? (
          <SpotlightCard
            key={`${badge.title}-${badge.issued}`}
            as={Link}
            href={badge.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            spotlightColor="var(--brand-solid-medium)"
          >
            <BadgeCardBody badge={badge} />
          </SpotlightCard>
        ) : (
          <SpotlightCard
            key={`${badge.title}-${badge.issued}`}
            className={styles.card}
            spotlightColor="var(--brand-solid-medium)"
          >
            <BadgeCardBody badge={badge} />
          </SpotlightCard>
        ),
      )}
    </Grid>
  );
}

function BadgeCardBody({ badge }: { badge: BadgeItem }) {
  const isRemote = badge.src.startsWith("http://") || badge.src.startsWith("https://");

  return (
    <Column fillWidth gap="16">
      <div className={styles.imageWrap}>
        <Image
          src={badge.src}
          alt={badge.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className={`${styles.logoImage} ${badge.invertInDark ? styles.invertInDark : ""}`}
          unoptimized={isRemote}
          referrerPolicy="no-referrer"
        />
      </div>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          {badge.title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {badge.issuer}
        </Text>
      </Column>

      <Row gap="8" wrap>
        <Badge>Issued {badge.issued}</Badge>
        {badge.expires && <Badge>Expires {badge.expires}</Badge>}
      </Row>

      {badge.credentialId && (
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Credential ID {badge.credentialId}
        </Text>
      )}

      {badge.skills && badge.skills.length > 0 && (
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Skills: {badge.skills.join(", ")}
        </Text>
      )}

      {badge.link && (
        <Row>
          <Button size="s" variant="secondary" prefixIcon="openLink">
            Show credential
          </Button>
        </Row>
      )}
    </Column>
  );
}
