import { ImageResponse } from "next/og";

import { Avatar, Row, Stack, Text, og, ogFonts, projectIcon } from "../components/open-graph";
import { homeProjects } from "./projects/projects";
import resume from "./resume.json";

export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

/** The site card: the name as a poster, the lede, the featured projects' icons, and the portrait. */
export default async function Image() {
  return new ImageResponse(
    (
      <Row
        gap={64}
        align="center"
        style={{
          width: "100%",
          height: "100%",
          padding: 64,
          background: og.ground,
          fontFamily: og.font,
        }}
      >
        <Stack style={{ flex: 1, minWidth: 0, height: "100%", justifyContent: "space-between" }}>
          <Stack gap={22}>
            <Text fontSize={108} weight={700} lineHeight={0.98} style={{ letterSpacing: "-0.04em", whiteSpace: "pre-line" }}>
              {"Andrew\nLisowski"}
            </Text>
            <Text fontSize={28} lineHeight={1.35} color="ink2" style={{ maxWidth: 560 }}>
              Front-end engineer. Design systems by day; building on the AT Protocol at night.
            </Text>
          </Stack>

          {/* The featured projects, icons only: the card's one bit of color, like a dock. */}
          <Row gap={14} align="center">
            {homeProjects.map((p) => {
              // at·store's icon sets its "at" in a font the renderer doesn't have; draw it here in Inter.
              if (p.slug === "atstore") {
                return (
                  <div
                    key={p.slug}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 56,
                      height: 56,
                      borderRadius: 13,
                      background: "#191816",
                      color: "#f2efe8",
                      fontSize: 26,
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      boxShadow: `0 0 0 1px ${og.hair}, 0 6px 16px rgba(0,0,0,0.08)`,
                    }}
                  >
                    <span style={{ marginLeft: -4 }}>at</span>
                    <span style={{ width: 7, height: 7, borderRadius: 7, background: "#1c4ef5", marginLeft: 2, marginTop: 10 }} />
                  </div>
                );
              }
              const src = projectIcon(p.icon);
              const tv = p.iconAspect === "tv";
              return src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.slug}
                  src={src}
                  alt=""
                  width={tv ? 90 : 56}
                  height={tv ? 54 : 56}
                  style={{ borderRadius: tv ? 11 : 13, boxShadow: `0 0 0 1px ${og.hair}, 0 6px 16px rgba(0,0,0,0.08)` }}
                />
              ) : (
                <div key={p.slug} style={{ width: 56, height: 56, borderRadius: 13, background: p.palette!.accent }} />
              );
            })}
          </Row>
        </Stack>

        <Avatar size={440} borderRadius={40} />
      </Row>
    ),
    { ...size, fonts: ogFonts }
  );
}
