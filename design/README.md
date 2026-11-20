# hipstersmoothie.com redesign — design exploration

Static HTML mockups, no build step. Open `home.html`. The `●` button in the nav flips light/dark.
Screenshots of every page (light, dark, mobile) are in `shots/`; `node shots/shoot.mjs` re-renders them.

| Page | What it explores |
| --- | --- |
| `home.html` | Grey editorial hero → **Featured** bento (the only color on the site) → grey rows for more projects, writing, work |
| `projects.html` | Uniform featured cards + a filterable grey list of everything else |
| `project-channel-surf.html` | A featured page for a project with a strong, dark identity and real screenshots |
| `project-sesh.html` | A featured page for a project whose identity is itself Apple-grey: one blue carries it |
| `blog.html` | The writing list in the new system, grouped by year |

## Principles

1. **One grey system, borrowed from Sesh and Channel Surf.** `--ground` / `--ground-alt` / `--ink` / `--ink-2` / `--hair`, system font stack (SF on Apple devices), `headline` (700, -0.035em, 1.05), `lede`, 22px tiles, pill buttons, translucent sticky nav. No crimson, no mauve, no accent token at all.
2. **Color belongs to projects.** Every featured tile and page sets `--p-bg / --p-ink / --p-ink2 / --p-accent` and nothing outside it is tinted. The nav, footer, rows, and prose stay grey even on a project page; the hero, one accent button, and the next/prev cards wear the project's color.
3. **Featured pages are explainers, not case studies.** Five beats: hero (icon, headline, lede, facts row, device shot) → "what it is" in three tiles → one big picture → "how it's built" (two-column: a claim + a stack list) → "why I made it" (three short paragraphs) → next/previous project.
4. **A project-local bar under the site nav** (icon, name, Overview / How it's built / Story, one colored button), like the product bar on an Apple product page. It's the one place a page says "you are inside a project now."
5. **When a project has no screenshots, the tile is a composition in its palette** (Standard Reader's paper, atstore's shelf of icons, cocore's receipt). Not a placeholder.
6. **Rows, not cards, for everything that isn't featured.** Name · chip · year · one line. Hover underlines the title. This replaces the current bordered Project cards.

## Tokens

```
light  ground #fff   ground-alt #f5f5f7  tile #fff     ink #1d1d1f  ink-2 #6e6e73  ink-3 #aeaeb2  hair rgba(0,0,0,.1)
dark   ground #000   ground-alt #101011  tile #1c1c1e  ink #f5f5f7  ink-2 #a1a1a6  ink-3 #636366  hair rgba(255,255,255,.14)
radius 22px, always `corner-shape: squircle` (continuous curvature; icons 22.37%)   pill 44px / 999px   nav 52px, saturate(180%) blur(20px)
headline clamp sizes: hero 42–76px (home) / 46–88px (project) · section 28–40px · tile h3 21px
```

## Featured set and their palettes (from each project's own assets)

| Project | bg | ink | accent | Source |
| --- | --- | --- | --- | --- |
| Sesh | site ground-alt | site ink | `#0071e3` | sesh.codes `global.css` |
| Channel Surf | `#111318` | `#f5f5f7` | `#FF6B4A` (+ `#FFC857`, `#1FB2A6`) | app icon SVG |
| kich.io | `#f6eee7` | `#28211d` | `#e0694b` | app `themeColor`, icon |
| Standard Reader | `#fcfbf6` | `#2a2420` | `#c2502b` | icon SVG |
| atstore.fyi | `#4058a7` | `#fff` | `#92d8f7` (+ `#86af58`, `#6dacde`, `#219546`) | logo SVG |
| cocore | `#0f0f0f` | `#f5f5f7` | `#a87d55` | icon |
| tealscape | `#1a0b2e` | `#f3ecff` | `#7e14ff` | favicon SVG |
| Marquee | `#2b1a12` | `#fff3e8` | `#ff6b3d` | SwiftUI `.orange` tint — needs a real icon |
| vinyl-scrobbler | `#1c1c1e` | `#f5f5f7` | `#ffd60a` | guess — logo is the React default, needs art |

Rows (not featured): Hip UI, kikbak.tv, tvml-react, forked, graphik, Homestead, devtools.fm, window-splitter, auto, react-docgen-typescript-plugin. Promote one by giving it a palette and a tile.

## Information architecture

```
/                 hero · featured bento · more projects · writing · work
/projects         featured cards · everything else (filterable)
/projects/<slug>  featured page (MDX-driven: frontmatter = palette, facts, links; body = the five beats)
/blog             unchanged content, new chrome
/experiments      unchanged content, new chrome
```

The résumé moves off the front page into rows; a `/resume` page (or the JSON) keeps the full version.

## Things I'd change on the next pass

- Sesh home tile: the Mac window is cropped from the top; it should be anchored so the title bar and sidebar read.
- Hero copy is placeholder in tone, not fact: "sweat the details" is from the current summary, the rest I wrote. Rewrite in your voice.
- "How it's built" rows on the Sesh page describe the architecture from the outside; check them against reality.
- Dates in rows are approximate; pull from git / frontmatter when built.
- Mobile: the Channel Surf tile art bleeds well; the Sesh tile needs its own mobile composition (phone only).

## Implementation (built 2026-11-19)

The site now follows these mockups. Where things live:

- Corners are real squircles: the `squircle` utility and `rounded-tile` (tailwind plugin) set `corner-shape: squircle`; device bezels, the TV frame and chips set it in `globals.css`. Browsers without `corner-shape` fall back to circular rounding.
- Tokens: `src/app/globals.css` (`--ground`, `--ink`… under `:root` / `.dark`; `.headline`, `.lede`, `.rows`/`.row`, `.pill`, device renders) and `tailwind.config.ts` (`ground`, `ground-alt`, `tile`, `ink`, `ink-2`, `ink-3`, `hair`, `nav`; `rounded-tile`, `shadow-tile`; system font stack).
- Shell: `src/components/NavigationHeader.tsx`, `Footer.tsx`, `ui/PageHeader.tsx`, `ui/SetThemeButton.tsx`.
- Projects: `src/app/projects/projects.ts` is the one list (palette ⇒ featured). `components/ProjectTiles.tsx` (bento, cards, rows), `TileArt.tsx` (per-project art), `Devices.tsx` (MacWindow, IPhone, Watch, TV). Assets in `public/projects/`.
- Every tile and row links out to the project's own site; there are no project pages here (decided 2026-11-19 — the mockups `project-sesh.html` / `project-channel-surf.html` remain as a reference should that change).
- To feature a project: give it a `palette` (and an icon) in `projects.ts` and add art to `TileArt.tsx`.
- The Radix palette is still installed for MDX content (code themes, callouts); chrome no longer uses it. OG images still use it; redo them in the grey system when convenient.
- `design/` is the exploration and stays as the reference; `design/shots/site-shoot.mjs` renders the real site (dev server on :3111) for review.
