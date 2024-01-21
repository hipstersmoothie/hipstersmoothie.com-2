import { ImageResponse } from "next/og";
import * as radixColors from "@radix-ui/colors";

import { Row, Stack, Text } from ".";
import { getRelativeTime } from "../ui/RelativeTime";
import { devLoader, prodLoader } from "../../app/experiments/image-utils";
import { getExperiment } from "../../app/experiments/utils";
import {
  PREVIEW_HEIGHT,
  PREVIEW_WIDTH,
} from "../../app/experiments/preview/constants";

const isDev = process.env.NODE_ENV === "development";

export async function geExperimentOgImage({
  slug,
  size,
}: {
  slug: string;
  size: { width: number; height: number };
}) {
  const experiment = await getExperiment(slug);

  return new ImageResponse(
    (
      <Stack
        tw="p-10"
        gap={24}
        style={{
          height: size.height,
          width: size.width,
          background: `linear-gradient(0deg, ${radixColors.mauveDark.mauve1}, ${radixColors.mauveDark.mauve2})`,
        }}
      >
        <Stack gap={16}>
          <Text
            fontSize={44}
            tw="px-6"
          >{`${experiment.title} Experiment`}</Text>
          <Text fontSize={24} color="mauve11" tw="px-6">
            {experiment.description}
          </Text>
        </Stack>

        <Row
          tw="overflow-hidden flex-1 min-h-0"
          style={{
            borderRadius: 32,
            border: `8px solid  ${radixColors.mauveDark.mauve6}`,
            boxShadow: `
            -15px 0 30px -10px ${radixColors.crimsonDark.crimson7},
            0 0 30px -10px ${radixColors.crimsonDark.crimson8},
            15px 0 30px -10px ${radixColors.crimsonDark.crimson6},
            0 0 0 1px ${radixColors.crimsonDark.crimson4}`,
          }}
        >
          <div tw="flex items-center justify-center flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img
              alt=""
              width={PREVIEW_WIDTH}
              height={PREVIEW_HEIGHT}
              tw="flex-1"
              style={{ objectFit: "cover" }}
              src={
                isDev
                  ? `http://localhost:3000${devLoader({ src: slug })}`
                  : `https://hipstsersmoothie.com${prodLoader({ src: slug })}`
              }
            /> */}
          </div>
        </Row>
        <Row>
          <Text fontSize={24} color="mauve11" tw="flex-1 px-6">
            by Andrew Lisowski
          </Text>
          <Text fontSize={24} color="mauve11" tw="px-6">
            {`Created: ${getRelativeTime(experiment.creationDate)}`}
          </Text>
        </Row>
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
