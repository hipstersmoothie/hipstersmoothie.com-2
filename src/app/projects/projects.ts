import type { CSSProperties } from "react";

/** A project's own colors. Set on a tile or page as --p-* variables; nothing else on the site is tinted. */
export interface ProjectPalette {
  bg: string;
  ink: string;
  ink2: string;
  accent: string;
  onAccent?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** One line, as on a tile. */
  tagline: string;
  /** A sentence or two, as on a featured tile. */
  description?: string;
  /** Short kind label for rows: "Apple TV", "Web", "Library"… */
  kind: string;
  /** What the project runs on, shown in the tile's accent color. */
  platforms?: string;
  years: string;
  price?: string;
  /** The project's own home. Every tile and row links out. */
  href: string;
  icon?: string;
  /** Channel Surf's icon is a 5:3 TV guide, not a square. */
  iconAspect?: "square" | "tv";
  /** Projects with a palette get a card on /projects; the rest are rows. The light palette. */
  palette?: ProjectPalette;
  /** The palette under the site's dark appearance; anything unset falls back to the light one. */
  dark?: Partial<ProjectPalette>;
  /** Also a tile in the home page bento. */
  home?: boolean;
  /** A featured tile that runs the full width of the bento, with its art beside the text. */
  wide?: boolean;
}

export const projects: Project[] = [
  {
    slug: "sesh",
    home: true,
    wide: true,
    name: "Sesh",
    tagline: "Remote control for every coding agent.",
    description:
      "Remote control for every coding agent. Start them, answer them and ship what they made from your Mac, iPhone, iPad or watch.",
    kind: "Mac · iOS",
    platforms: "Mac · iOS · watchOS",
    years: "2025–",
    price: "Free",
    href: "https://sesh.codes",
    icon: "/projects/sesh-icon.png",
    palette: { bg: "var(--ground-alt)", ink: "var(--ink)", ink2: "var(--ink-2)", accent: "#0071e3" },
    dark: { bg: "var(--tile)", accent: "#2997ff" },
  },
  {
    slug: "tcm",
    home: true,
    wide: true,
    name: "tcm.codes",
    tagline: "Code, not files. A content-addressed codebase manager for TypeScript.",
    description:
      "Code, not files. tcm stores every function, type and constant by the hash of its code, so renames break nothing and tests rerun only when code changes. Unison’s model, for plain TypeScript.",
    kind: "Dev tool",
    platforms: "CLI · VS Code · Node",
    years: "2026",
    price: "Open source",
    href: "https://tcm.codes",
    icon: "/projects/tcm-icon.svg",
    palette: { bg: "#eef2f8", ink: "#0d1117", ink2: "#59636e", accent: "#1f6feb" },
    dark: { bg: "#0d1117", ink: "#e6edf3", ink2: "#8d96a0", accent: "#58a6ff" },
  },
  {
    slug: "contributions",
    home: true,
    wide: true,
    name: "contributions.fyi",
    tagline: "Who funds your member of Congress? PAC money, lobbying and votes for all 539 members.",
    description:
      "Who funds your member of Congress? Every PAC dollar, lobbyist, trip and vote for all 539 members, from FEC filings and public records, with a Bluesky labeler that puts it on their posts.",
    kind: "Web",
    platforms: "Web · Bluesky",
    years: "2025–",
    href: "https://contributions.fyi",
    icon: "/projects/contributions-icon.png",
    palette: { bg: "#f9f9f7", ink: "#121212", ink2: "#6b6a65", accent: "#2a78d6" },
    dark: { bg: "#1a1a19", ink: "#f2f2ee", ink2: "#a3a29b", accent: "#5b9cf0" },
  },
  {
    slug: "graze",
    home: true,
    name: "Graze",
    tagline: "Own your algorithm: custom Bluesky feeds, no code required.",
    description:
      "The biggest feed builder for Bluesky. Compose a feed from blocks, a Scratch-like language, and publish it to the network.",
    kind: "Web",
    platforms: "Web · AT Protocol",
    years: "2024–",
    href: "https://www.graze.social",
    icon: "/projects/graze-icon.svg",
    palette: { bg: "#e4f7f7", ink: "#073f40", ink2: "#3f7a7b", accent: "#079a9b" },
    dark: { bg: "#0b2a2b", ink: "#e6fafa", ink2: "#8fc4c4", accent: "#2fd3d4" },
  },
  {
    slug: "standard-reader",
    home: true,
    name: "Standard Reader",
    tagline: "An editorial reader for standard.site publications.",
    description:
      "A warm, editorial reader for standard.site publications. RSS vibes, built around discovery.",
    kind: "Web",
    platforms: "Web · AT Protocol",
    years: "2026",
    href: "https://standard-reader.app",
    icon: "/projects/standard-reader-icon.svg",
    palette: { bg: "#fcfbf6", ink: "#2a2420", ink2: "#7c7268", accent: "#c2502b" },
    dark: { bg: "#1f1b16", ink: "#f3eee4", ink2: "#a89e90", accent: "#e8784f" },
  },
  {
    slug: "atstore",
    home: true,
    name: "at·store",
    tagline: "Apps on the Atmosphere: an open directory of what you can do with an AT Protocol account.",
    description:
      "Apps on the Atmosphere. An open directory of 500+ apps and games that share one identity, where the listings are protocol records, not rows we own.",
    kind: "Web",
    platforms: "Web · AT Protocol",
    years: "2026",
    href: "https://atstore.fyi",
    icon: "/projects/atstore-icon.svg",
    palette: { bg: "#f6f4ef", ink: "#191816", ink2: "#6f6a61", accent: "#1c4ef5" },
    dark: { bg: "#1a1917", ink: "#f2efe8", ink2: "#a3a097", accent: "#7b97ff" },
  },
  {
    slug: "cocore",
    home: true,
    name: "cocore",
    tagline: "Receipts for shared compute on the AT Protocol.",
    description:
      "Compute, but shared. A federated co-op where every job leaves a signed receipt you own.",
    kind: "Web",
    platforms: "Web · AT Protocol",
    years: "2026",
    href: "https://console.cocore.dev",
    icon: "/projects/cocore-icon.png",
    palette: { bg: "#f6efe7", ink: "#3e332e", ink2: "#7a6a5e", accent: "#815e46" },
    dark: { bg: "#0f0f0f", ink: "#f5f5f7", ink2: "#9a9a9a", accent: "#a87d55" },
  },
  {
    slug: "channel-surf",
    name: "Channel Surf",
    tagline: "Your Plex, Jellyfin or Emby library as live TV, on Apple TV.",
    kind: "Apple TV",
    platforms: "Apple TV",
    years: "2026",
    price: "$4.99 once",
    href: "https://channelsurf.tv",
    icon: "/projects/channel-surf-icon.svg",
    iconAspect: "tv",
    palette: { bg: "#e9ecf2", ink: "#111318", ink2: "#5c6270", accent: "#e8532f" },
    dark: { bg: "#111318", ink: "#f5f5f7", ink2: "#a1a1a6", accent: "#FF6B4A" },
  },
  { slug: "github-labeler-bot", name: "GitHub Labeler", tagline: "A Bluesky labeler that puts the repositories you contribute to on your profile.", kind: "Bluesky", years: "2024–", href: "https://github.com/hipstersmoothie/github-labeler-bot" },
  { slug: "kich-io", name: "kich.io", tagline: "Pantry, recipes and grocery lists for one household, on the AT Protocol.", kind: "Web", years: "2026", href: "https://kich.io" },
  { slug: "hip-ui", name: "Hip UI", tagline: "Copy-and-own components on React Aria and StyleX. The base under everything else here.", kind: "Design system", years: "2025–", href: "https://hip-ui.tngl.io" },
  { slug: "kikbak", name: "kikbak.tv", tagline: "Scans hundreds of music blogs for what's playing and charts it by genre.", kind: "Web", years: "2012–", href: "https://kikbak.tv" },
  { slug: "vinyl-scrobbler", name: "vinyl-scrobbler", tagline: "Now-playing and lyrics on the TV for records, scrobbled to my PDS.", kind: "Home", years: "2026", href: "https://github.com/hipstersmoothie/vinyl-scrobbler" },
  { slug: "tvml-react", name: "tvml-react", tagline: "A React renderer for Apple TV's TVMLKit.", kind: "Library", years: "2026", href: "https://github.com/hipstersmoothie/tvml-react" },
  { slug: "homestead", name: "Homestead", tagline: "A self-hosted assistant for one household.", kind: "Home", years: "2026", href: "/homestead.html" },
  {
    slug: "devtools-fm",
    name: "devtools.fm",
    tagline: "A podcast about developer tools and the people who make them.",
    kind: "Podcast",
    platforms: "Podcast · YouTube",
    years: "2021–",
    href: "https://devtools.fm",
    icon: "/projects/devtools-fm-icon.png",
    palette: { bg: "#f2ecf8", ink: "#1d1a22", ink2: "#6e6579", accent: "#b23fcf" },
    dark: { bg: "#141416", ink: "#f9f9fa", ink2: "#a5a1ad", accent: "#e07bf0" },
  },
  { slug: "storybook-dark-mode", name: "storybook-dark-mode", tagline: "A Storybook addon that lets your users toggle between dark and light mode.", kind: "Open source", years: "2019–", href: "https://github.com/hipstersmoothie/storybook-dark-mode" },
  { slug: "storybook-addon-react-docgen", name: "storybook-addon-react-docgen", tagline: "Display react-docgen prop tables in Storybook.", kind: "Open source", years: "2018–", href: "https://github.com/hipstersmoothie/storybook-addon-react-docgen" },
  { slug: "bluesky-labelers", name: "bluesky-labelers", tagline: "A directory of every labeler on Bluesky.", kind: "Web", years: "2024–", href: "https://github.com/hipstersmoothie/bluesky-labelers" },
  { slug: "window-splitter", name: "window-splitter", tagline: "A full-featured ARIA window splitter for React.", kind: "Library", years: "2024", href: "https://react-window-splitter-six.vercel.app" },
  { slug: "auto", name: "auto", tagline: "Release automation from semantic-version labels on pull requests.", kind: "Open source", years: "2018–", href: "https://github.com/intuit/auto" },
  { slug: "react-docgen-typescript-plugin", name: "react-docgen-typescript-plugin", tagline: "Inject TypeScript docgen info into React components.", kind: "Open source", years: "2020", href: "https://github.com/hipstersmoothie/react-docgen-typescript-plugin" },
];

/** Cards on /projects. */
export const featuredProjects = projects.filter((p) => p.palette);
/** Tiles in the home page bento. */
export const homeProjects = featuredProjects.filter((p) => p.home);
/** The year a project started: the first number in its `years`. */
function startYear(project: Project) {
  return Number(project.years.match(/\d{4}/)?.[0] ?? 0);
}

/** Rows under "Everything else", newest first. */
export const otherProjects = projects
  .filter((p) => !p.palette)
  .sort((a, b) => startYear(b) - startYear(a));

/**
 * The palette variables a tile reads its colors from. Light and dark are both set; the `.palette`
 * rule in globals.css picks one by the site's appearance, so a tile never needs `dark:` classes
 * for its own colors.
 */
export function paletteStyle(project: Project): CSSProperties {
  const light = project.palette!;
  const dark = { ...light, ...project.dark };
  return {
    "--pl-bg": light.bg,
    "--pl-ink": light.ink,
    "--pl-ink2": light.ink2,
    "--pl-accent": light.accent,
    "--pl-on-accent": light.onAccent ?? "#fff",
    "--pd-bg": dark.bg,
    "--pd-ink": dark.ink,
    "--pd-ink2": dark.ink2,
    "--pd-accent": dark.accent,
    "--pd-on-accent": dark.onAccent ?? "#fff",
  } as CSSProperties;
}
