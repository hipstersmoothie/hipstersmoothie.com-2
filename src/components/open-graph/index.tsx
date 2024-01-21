import * as radixColors from "@radix-ui/colors";
import resume from "../../app/resume.json";

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
  lineHeight = 1,
  color = "mauve12",
  ...rest
}: {
  fontSize?: React.CSSProperties["fontSize"];
  lineHeight?: React.CSSProperties["lineHeight"];
  ellipsis?: boolean;
  color?: "mauve11" | "mauve12" | "crimson11" | "crimson12";
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <div
      style={{
        fontSize,
        lineHeight,
        color:
          color === "mauve11" || color === "mauve12"
            ? radixColors.mauveDark[color]
            : radixColors.crimsonDark[color],
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

export function Avatar({
  size = 280,
  borderRadius = 32,
}: {
  size?: number;
  borderRadius?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resume.basics.image}
      alt="Andrew smiling"
      style={{
        borderRadius: borderRadius,
        background: "white",
        height: size,
        width: size,
        border: `8px solid  ${radixColors.mauveDark.mauve8}`,
        boxShadow: `
          -15px 0 30px -10px ${radixColors.crimsonDark.crimson7},
          0 0 30px -10px ${radixColors.crimsonDark.crimson8},
          15px 0 30px -10px ${radixColors.crimsonDark.crimson6},
          0 0 0 1px ${radixColors.crimsonDark.crimson4}`,
      }}
    />
  );
}
