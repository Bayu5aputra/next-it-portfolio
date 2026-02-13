import { badges, baseURL, person } from "@/resources";
import { Flex, Grid, Heading, Meta, RevealFx, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata() {
  return Meta.generate({
    title: badges.title,
    description: badges.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(badges.title)}`,
    path: badges.path,
  });
}

export default function Badges() {
  return (
    <>
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
      <Flex fillWidth direction="column" horizontal="center" gap="40" paddingY="l">
        <Flex direction="column" horizontal="center" gap="16">
          <Heading variant="display-default-xs" style={{ textAlign: "center" }}>
            {badges.title}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" style={{ textAlign: "center" }}>
            {badges.description}
          </Text>
        </Flex>

        <Grid
          columns="3"
          gap="32"
          s={{ columns: 1 }}
          m={{ columns: 2 }}
          fillWidth
          paddingX="l"
        >
          {badges.items.map((badge, index) => (
            <RevealFx key={badge.title} delay={index * 0.1}>
              <Link href={badge.link || "#"} target="_blank">
                <Flex
                  direction="column"
                  horizontal="center"
                  gap="16"
                  padding="24"
                  radius="l"
                  border="neutral-alpha-weak"
                  background="surface"
                  style={{
                    transition: "transform 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ position: "relative", width: "120px", height: "120px" }}>
                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <Flex direction="column" horizontal="center" gap="8">
                    <Heading variant="heading-strong-s" style={{ textAlign: "center" }}>
                      {badge.title}
                    </Heading>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {badge.issuer}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            </RevealFx>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
