import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import * as radixColors from "@radix-ui/colors";

/**
 * Convert the colors in Radix format to Tailwind format.
 *
 * @example blueDark.blue1 -> bluedark.1
 */
function formatRadixColors() {
  const colors: Record<string, Record<string, string>> = {};

  for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
    const colorName = radixColorName.toLowerCase();
    const color: Record<string, string> = {};

    for (const [radixScale, value] of Object.entries(radixColor)) {
      const scaleRegex = radixScale.match(/\d+$/);
      if (!scaleRegex || !scaleRegex[0]) {
        continue;
      }
      const scale = scaleRegex[0];
      color[scale] = value;
    }

    colors[colorName] = color;
  }

  return colors;
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
    "mdx-components.tsx",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // The site's grey system (see design/README.md). Color belongs to projects only.
        ground: "var(--ground)",
        "ground-alt": "var(--ground-alt)",
        tile: "var(--tile)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        hair: "var(--hair)",
        nav: "var(--nav)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ...formatRadixColors(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        press: {
          "0%": { transform: "scale(1.025)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.025)" },
        },
      },
      animation: {
        press: "press 300ms linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"Helvetica Neue"',
          "Inter",
          "sans-serif",
        ],
        mono: ["ui-monospace", '"SF Mono"', "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        tile: "var(--shadow-sm)",
        device: "var(--shadow)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    plugin(({ addVariant, addUtilities }) => {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant("in-preview", ".in-preview &");
      // Real squircles: continuous-curvature corners like Apple's, not circular arcs.
      // `corner-shape` keeps box-shadow and overflow clipping; browsers without it round.
      addUtilities({
        ".squircle": { "corner-shape": "squircle" },
        ".rounded-tile": { "border-radius": "22px", "corner-shape": "squircle" },
      });
    }),
  ],
};
export default config;
