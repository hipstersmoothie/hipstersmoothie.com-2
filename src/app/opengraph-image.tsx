import { ImageResponse } from "next/og";

import { Avatar, Row, Stack, Text, og, ogFonts } from "../components/open-graph";
import { homeProjects } from "./projects/projects";
import resume from "./resume.json";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

/** The site card: name, the lede, and the names of the featured projects. */
export default async function Image() {
  return new ImageResponse(
    (
      <Row
        gap={64}
        style={{
          width: "100%",
          height: "100%",
          padding: 64,
          background: og.ground,
          fontFamily: og.font,
        }}
      >
        <Stack gap={20} style={{ flex: 1, minWidth: 0 }}>
          <Text fontSize={96} weight={700} lineHeight={1}>
            {resume.basics.name}
          </Text>
          <Text fontSize={30} lineHeight={1.4} color="ink2" style={{ maxWidth: 640 }}>
            Front-end engineer. Design systems by day; building on the AT Protocol at night.
          </Text>
          <Row gap={10} style={{ marginTop: 20, flexWrap: "wrap" }}>
            {homeProjects.map((p) => (
              <div
                key={p.slug}
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: og.ink,
                  background: og.groundAlt,
                  borderRadius: 999,
                  padding: "8px 18px",
                }}
              >
                {p.name}
              </div>
            ))}
          </Row>
        </Stack>
        <Avatar size={320} />
      </Row>
    ),
    { ...size, fonts: ogFonts }
  );
}
