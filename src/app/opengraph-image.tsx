import { ImageResponse } from "next/og";

import { Avatar, ProjectTile, Row, Stack, Text, og, ogFonts } from "../components/open-graph";
import { homeProjects } from "./projects/projects";
import resume from "./resume.json";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

/** The site card: name and lede beside the portrait, then the featured projects as tiles. */
export default async function Image() {
  return new ImageResponse(
    (
      <Stack
        style={{
          width: "100%",
          height: "100%",
          padding: "56px 0 56px 64px",
          background: og.ground,
          fontFamily: og.font,
          overflow: "hidden",
        }}
      >
        <Row gap={48} align="center" style={{ paddingRight: 64 }}>
          <Stack gap={18} style={{ flex: 1, minWidth: 0 }}>
            <Text fontSize={84} weight={700} lineHeight={1}>
              {resume.basics.name}
            </Text>
            <Text fontSize={28} lineHeight={1.35} color="ink2" style={{ maxWidth: 720 }}>
              Front-end engineer. Design systems by day; building on the AT Protocol at night.
            </Text>
          </Stack>
          <Avatar size={176} />
        </Row>

        {/* The tiles run off the card's right edge, as the art does on the site. */}
        <Row gap={16} align="flex-start" style={{ marginTop: "auto" }}>
          {homeProjects.map((p) => (
            <ProjectTile
              key={p.slug}
              name={p.name}
              platforms={p.platforms}
              icon={p.icon}
              iconAspect={p.iconAspect}
              palette={p.palette!}
            />
          ))}
        </Row>
      </Stack>
    ),
    { ...size, fonts: ogFonts }
  );
}
