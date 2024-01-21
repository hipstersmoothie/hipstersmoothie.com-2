import { ImageResponse } from "next/og";
import * as radixColors from "@radix-ui/colors";
import { RootContent } from "mdast";

import { Avatar, Row, Stack, Text } from "./";
import { getRelativeTime } from "../ui/RelativeTime";
import { getBlogPost, mdxProcessor, renderPhrase } from "../../app/blog/utils";

function BlockRenderer({ value, key }: { value: RootContent; key: string }) {
  if (value.type === "paragraph") {
    return (
      <p
        style={{
          padding: 0,
          margin: 0,
          fontSize: 32,
          color: "transparent",
        }}
      >
        {value.children.map((child, index) =>
          renderPhrase({
            key: `${key}-paragraph-${index}`,
            value: child,
          })
        )}
      </p>
    );
  }

  if (value.type === "heading") {
    return (
      <h1
        style={{
          fontSize: 50 - value.depth * 4,
          color: "transparent",
        }}
      >
        {value.children.map((child, index) =>
          renderPhrase({
            key: `${key}-heading-${index}`,
            value: child,
          })
        )}
      </h1>
    );
  }

  if (value.type === "list") {
    return (
      <ul tw="flex flex-col">
        {value.children.map((child, index) => {
          return (
            <li
              tw="ml-4 flex"
              style={{ color: "transparent", gap: 8 }}
              key={`${key}-list-${index}`}
            >
              <span tw="text-5xl h-12 flex items-center justify-center">
                <span>•</span>
              </span>
              {child.children.map((child, index) => (
                <BlockRenderer key={`${key}-list-${index}`} value={child} />
              ))}
            </li>
          );
        })}
      </ul>
    );
  }

  console.log("block", value);
  return null;
}

export async function getPostOgImage({
  slug,
  size,
}: {
  slug: string;
  size: {
    width: number;
    height: number;
  };
}) {
  const post = await getBlogPost(slug, { includeSource: true });

  console.log(post);
  if (!post) {
    throw new Error("Post not found");
  }
  // full size - avatar size - gap - padding
  const availableWidth = size.width - 200 - 40 - 80;
  const ast = mdxProcessor.parse(post.source);

  return new ImageResponse(
    (
      <Stack
        tw="w-full h-full"
        gap={36}
        style={{
          background: `linear-gradient(0deg, ${radixColors.mauveDark.mauve1}, ${radixColors.mauveDark.mauve2})`,
        }}
      >
        <Row
          gap={48}
          tw="p-10"
          style={{
            background: `linear-gradient(180deg, ${radixColors.mauveDark.mauve1}, ${radixColors.crimsonDark.crimson3})`,
          }}
        >
          <Avatar size={200} />
          <Stack gap={16} tw="flex-1 min-w-0">
            <Text
              fontSize={Math.min(
                100,
                availableWidth / (post.title.length / 2.5)
              )}
            >
              {post.title}
            </Text>
            <Row gap={50}>
              <Text fontSize={24} color="mauve11">
                {post.readingTime.text}
              </Text>
              <Text fontSize={24} color="mauve11">
                {`Updated: ${getRelativeTime(post.lastUpdated)}`}
              </Text>
            </Row>
          </Stack>
        </Row>

        <Stack
          gap={16}
          tw="px-10"
          style={{
            background: `linear-gradient(180deg, ${radixColors.mauveDark.mauve12}, ${radixColors.mauveDark.mauve2})`,
            backgroundSize: "100% 340px",
            backgroundRepeat: "no-repeat",
            backgroundClip: "text",
          }}
        >
          {ast.children.slice(0, 7).map((child, index) => {
            return <BlockRenderer key={`root-${index}`} value={child} />;
          })}
        </Stack>
      </Stack>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
