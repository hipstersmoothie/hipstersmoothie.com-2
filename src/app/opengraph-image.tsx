import { ImageResponse } from "next/og";
import * as radixColors from "@radix-ui/colors";

import { Avatar, Row, Stack, Text } from "../components/open-graph";
import { getBlogPostList } from "./blog/utils";
import { getExperimentList } from "./experiments/utils";
import { PostItem } from "../components/open-graph/ListOgImage";

// Image metadata
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  const [latestBlogPost] = await getBlogPostList();
  const [latestExperiment] = await getExperimentList();

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
        <Row gap={48} tw="px-8">
          <Avatar size={240} />
          <Stack gap={20}>
            <Text fontSize={100}>Andrew Lisowski</Text>
            <Text fontSize={40} color="mauve11">
              @hipstersmoothie
            </Text>
          </Stack>
        </Row>

        <Stack gap={24}>
          <Stack gap={8}>
            <Text fontSize={32} tw="px-8" color="mauve11">
              Latest Blog Post
            </Text>
            <PostItem item={latestBlogPost} />
          </Stack>
          <Stack gap={8}>
            <Text fontSize={32} tw="px-8" color="mauve11">
              Latest Experiment
            </Text>
            <PostItem item={latestExperiment} />
          </Stack>
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
