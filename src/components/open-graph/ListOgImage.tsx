import { ImageResponse } from "next/og";

import { getRelativeTime } from "../ui/RelativeTime";
import { Avatar, Row, Stack, Text, Wordmark, og, ogFonts } from "./";

interface PostItemData {
  title: string;
  creationDate: Date;
  lastUpdated?: Date;
}

/** One row of the list: title, then when. The same shape as the site's rows. */
export function PostItem({
  item,
  style,
}: {
  item: PostItemData;
  style?: React.CSSProperties;
}) {
  return (
    <Row
      style={{
        padding: "22px 0",
        borderBottom: `1px solid ${og.hair}`,
        ...style,
      }}
    >
      <Row style={{ flex: 1, paddingRight: 40, minWidth: 0 }}>
        <Text fontSize={34} weight={600} ellipsis>
          {item.title}
        </Text>
      </Row>
      <Text fontSize={24} color="ink3">
        {getRelativeTime(item.creationDate)}
      </Text>
    </Row>
  );
}

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
      <Stack
        style={{
          width: "100%",
          height: "100%",
          padding: 64,
          background: og.ground,
          fontFamily: og.font,
        }}
      >
        <Row justify="space-between" align="flex-start">
          <Stack gap={14}>
            <Text fontSize={22} weight={600} color="ink2" style={{ letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {`${items.length} posts · latest ${getRelativeTime(items[0].lastUpdated || items[0].creationDate)}`}
            </Text>
            <Text fontSize={96} weight={700} lineHeight={1}>
              {title}
            </Text>
          </Stack>
          <Avatar size={120} />
        </Row>

        <Stack style={{ marginTop: 36, borderTop: `1px solid ${og.hair}` }}>
          {items.slice(0, 3).map((item) => (
            <PostItem key={item.title} item={item} />
          ))}
        </Stack>

        <Row style={{ marginTop: "auto" }}>
          <Wordmark />
        </Row>
      </Stack>
    ),
    { ...size, fonts: ogFonts }
  );
}
