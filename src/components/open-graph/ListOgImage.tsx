import { ImageResponse } from "next/og";
import * as radixColors from "@radix-ui/colors";

import { getRelativeTime } from "../ui/RelativeTime";
import { Avatar, Row, Stack, Text } from "./";

interface PostItemData {
  title: string;
  creationDate: Date;
  lastUpdated?: Date;
}

export function PostItem({
  item,
  style,
  tw,
}: {
  item: PostItemData;
  style?: React.CSSProperties;
  tw?: string;
}) {
  return (
    <Row tw={`relative px-8 h-20 ${tw}`} style={style}>
      <div
        tw="absolute inset-1 rounded"
        style={{
          background: `linear-gradient(10deg, ${radixColors.mauveDark.mauve5}, ${radixColors.mauveDark.mauve4})`,
        }}
      />

      <Row tw="flex-1 pr-10">
        <Text fontSize={40} lineHeight={1.25} ellipsis>
          {item.title}
        </Text>
      </Row>

      <Text color="mauve11">{getRelativeTime(item.creationDate)}</Text>
    </Row>
  );
}

// Image generation
export default async function getListOgImage({
  items,
  size,
  title,
}: {
  items: PostItemData[];
  size: { width: number; height: number };
  title: string;
}) {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <Stack
        gap={40}
        tw="w-full h-full p-10"
        style={{
          background: `linear-gradient(0deg, ${radixColors.mauveDark.mauve1}, ${radixColors.mauveDark.mauve2})`,
        }}
      >
        <Row gap={48}>
          <Avatar />
          <Stack gap={20}>
            <Text fontSize={110}>{title}</Text>
            <Text fontSize={44} color="mauve11">
              {`Updated: ${getRelativeTime(
                items[0].lastUpdated || items[0].creationDate
              )}`}
            </Text>
          </Stack>
        </Row>

        <Stack>
          {items.map((item, index) => (
            <PostItem
              key={item.title}
              item={item}
              style={{
                opacity: 1 - index * 0.25,
                margin: `0 ${index * 8}px`,
              }}
            />
          ))}
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
