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

/** A project's icon as a data URL, so Satori can draw it without a network. */
export function projectIcon(icon: string | undefined) {
  if (!icon) return undefined;
  const file = path.join(process.cwd(), "public", icon);
  const data = readFileSync(file);
  const mime = icon.endsWith(".svg") ? "image/svg+xml" : "image/png";
  return `data:${mime};base64,${data.toString("base64")}`;
}

/**
 * A featured project as a small tile in its own light palette: the only color on a card, as on
 * the site. Icon on top, name and platform below.
 */
export function ProjectTile({
  name,
  platforms,
  icon,
  iconAspect,
  palette,
  width = 236,
  height = 236,
}: {
  name: string;
  platforms?: string;
  icon?: string;
  iconAspect?: "square" | "tv";
  palette: { bg: string; ink: string; ink2: string; accent: string };
  width?: number;
  height?: number;
}) {
  const src = projectIcon(icon);
  // The two tokens that reference the site's own greys resolve to literals here.
  const bg = palette.bg.startsWith("var(") ? og.groundAlt : palette.bg;
  const ink = palette.ink.startsWith("var(") ? og.ink : palette.ink;
  const ink2 = palette.ink2.startsWith("var(") ? og.ink2 : palette.ink2;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width,
        height,
        padding: 24,
        borderRadius: 26,
        background: bg,
        color: ink,
        boxShadow: `0 0 0 1px ${og.hair}`,
        flexShrink: 0,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={iconAspect === "tv" ? 86 : 54}
          height={iconAspect === "tv" ? 52 : 54}
          style={{ borderRadius: iconAspect === "tv" ? 11 : 12, boxShadow: `0 0 0 1px ${og.hair}` }}
        />
      ) : (
        <div style={{ width: 54, height: 54, borderRadius: 12, background: palette.accent }} />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.05 }}>{name}</div>
        {platforms && (
          <div style={{ fontSize: 15, fontWeight: 600, color: palette.accent, letterSpacing: 0 }}>{platforms}</div>
        )}
      </div>
    </div>
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
