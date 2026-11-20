import { readFileSync } from "fs";
import path from "path";

/*
 * Pieces for the social images, in the site's grey system: paper ground, ink, a hairline.
 * Satori renders these, so styles are inline and colors are literal (no CSS variables).
 */
export const og = {
  ground: "#ffffff",
  groundAlt: "#f5f5f7",
  ink: "#1d1d1f",
  ink2: "#6e6e73",
  ink3: "#aeaeb2",
  hair: "rgba(0, 0, 0, 0.1)",
  font: "Inter",
};

// Satori has no system fonts, so the images ship their own: Inter at the weights Text uses.
// Loaded once per process and handed to every ImageResponse as `fonts`.
const fontDir = path.join(process.cwd(), "src/components/open-graph/fonts");
export const ogFonts = ([400, 600, 700] as const).map((weight) => ({
  name: "Inter",
  data: readFileSync(path.join(fontDir, `Inter-${weight}.ttf`)),
  weight,
  style: "normal" as const,
}));

// The portrait, inlined: the image routes render at build time, where only the filesystem is sure to exist.
const portrait = `data:image/jpeg;base64,${readFileSync(
  path.join(process.cwd(), "public/profile.jpeg")
).toString("base64")}`;

export function Row({
  align: alignItems = "center",
  justify: justifyContent = "flex-start",
  gap = 0,
  style,
  ...rest
}: {
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  gap?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{ display: "flex", alignItems, justifyContent, gap, ...style }}
      {...rest}
    />
  );
}

export function Stack({
  align: alignItems = "stretch",
  justify: justifyContent = "flex-start",
  gap = 0,
  style,
  ...rest
}: {
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  gap?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems,
        justifyContent,
        gap,
        ...style,
      }}
      {...rest}
    />
  );
}

export function Text({
  ellipsis,
  style,
  fontSize = 32,
  lineHeight = 1.1,
  color = "ink",
  weight = 400,
  ...rest
}: {
  fontSize?: number;
  lineHeight?: React.CSSProperties["lineHeight"];
  ellipsis?: boolean;
  color?: "ink" | "ink2" | "ink3";
  weight?: 400 | 600 | 700;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <div
      style={{
        fontSize,
        lineHeight,
        fontWeight: weight,
        letterSpacing: fontSize >= 48 ? "-0.035em" : "-0.01em",
        color: og[color],
        ...(ellipsis
          ? {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }
          : {}),
        ...style,
      }}
      {...rest}
    />
  );
}

/** The portrait as a rounded tile, like the home page. */
export function Avatar({
  size = 280,
  borderRadius = Math.round(size * 0.12),
}: {
  size?: number;
  borderRadius?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={portrait}
      alt="Andrew smiling"
      style={{
        borderRadius,
        height: size,
        width: size,
        objectFit: "cover",
        boxShadow: `0 0 0 1px ${og.hair}, 0 10px 30px rgba(0,0,0,0.1)`,
      }}
    />
  );
}

/** The one-line footer every social image shares. */
export function Wordmark({ size = 24 }: { size?: number }) {
  return (
    <Row gap={12}>
      <Text fontSize={size} weight={600}>
        Andrew Lisowski
      </Text>
      <Text fontSize={size} color="ink3">
        hipstersmoothie.com
      </Text>
    </Row>
  );
}
