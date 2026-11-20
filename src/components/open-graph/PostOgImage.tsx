import { ImageResponse } from "next/og";

import { Avatar, Row, Stack, Text, Wordmark, og, ogFonts } from "./";
import { getBlogPost, getPostDescription } from "../../app/blog/utils";

/** A post's card: tags, the title at the site's headline scale, its description, the byline. */
export async function getPostOgImage({
  slug,
  size,
}: {
  slug: string;
  size: { width: number; height: number };
}) {
  const post = await getBlogPost(slug, { includeSource: true });

  if (!post) {
    throw new Error("Post not found");
  }

  const description = getPostDescription(post);
  const tags = post.frontMatter.tags ?? [];
  // Long titles step down so they stay on two or three lines.
  const titleSize = post.title.length > 48 ? 64 : post.title.length > 30 ? 76 : 88;

  return new ImageResponse(
    (
      <Stack
        style={{
          width: "100%",
          height: "100%",
          padding: 64,
          background: og.ground,
          fontFamily: og.font,
        }}
      >
        {tags.length > 0 && (
          <Row gap={10}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 22,
                  color: og.ink2,
                  background: og.groundAlt,
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                {tag}
              </div>
            ))}
          </Row>
        )}

        <Text
          fontSize={titleSize}
          weight={700}
          lineHeight={1.05}
          style={{ marginTop: 24, maxWidth: 1000 }}
        >
          {post.title}
        </Text>

        {description && (
          <Text
            fontSize={28}
            lineHeight={1.4}
            color="ink2"
            style={{
              marginTop: 24,
              maxWidth: 960,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Text>
        )}

        <Row gap={20} style={{ marginTop: "auto" }}>
          <Avatar size={56} />
          <Wordmark />
          <Text fontSize={24} color="ink3" style={{ marginLeft: "auto" }}>
            {post.readingTime.text}
          </Text>
        </Row>
      </Stack>
    ),
    { ...size, fonts: ogFonts }
  );
}
