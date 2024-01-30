import nextMdx from "@next/mdx";
import path from "path";

import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkEmoji from "remark-emoji";
import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";
import remarkCustomBlockQuotes from "remark-custom-blockquotes";

const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeImgSize from "rehype-img-size";

const dir = path.dirname(import.meta.url).replace("file://", "");

function quoteattr(s, preserveCR) {
  preserveCR = preserveCR ? "&#13;" : "\n";
  return (
    ("" + s) /* Forces the conversion to string. */
      .replace(/&/g, "&amp;") /* This MUST be the 1st replacement. */
      .replace(/'/g, "&apos;") /* The 4 other predefined entities, required. */
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      /*
      You may add other replacements here for HTML only 
      (but it's not necessary).
      Or for XML, only if the named entities are defined in its DTD.
      */
      .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
      .replace(/[\r\n]/g, preserveCR)
  );
}

function handleError({ error, url, transformer }) {
  if (
    transformer.name !== "@remark-embedder/transformer-oembed" ||
    !url.includes("twitter.com")
  ) {
    // we're only handling errors from this specific transformer and the twitter URL
    // so we'll rethrow errors from any other transformer/url
    throw error;
  }
  return `<p class="max-w-prose mx-auto px-4 text-mauve-12 dark:text-mauvedark-12 my-4">Unable to embed <a href="${url}">this tweet</a>.</p>`;
}

function handleHTML(htmlRaw, info) {
  const html = htmlRaw.replace(/class=/, "className=");
  const { url, transformer } = info;

  if (url.includes("youtube.com")) {
    return `<div class="embed-youtube aspect-w-16 aspect-h-9">${html}</div>`;
  }

  if (url.includes("twitter.com") || url.includes("x.com")) {
    const [, name, username] = html.match(/&mdash; (.+) \((@.*)\)/);
    const content = html.match(/<p[^\>]*>(.*)<\/p>&mdash/)[1];
    const date = html.match(/<a.*>(.*)<\/a>/)[1];

    return html.replace(
      /<blockquote/,
      `<blockquote data-tweet-url="${url}" data-name="${name}" data-username="${username}" data-content="${quoteattr(
        content
      )}" data-date="${date}"`
    );
  }

  return html;
}

const withMDX = nextMdx({
  options: {
    remarkPlugins: [
      [
        remarkCustomBlockQuotes,
        {
          mapping: {
            "i>": "info",
            "!>": "warning",
            "S>": "success",
          },
        },
      ],
      remarkFlexibleMarkers,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkUnwrapImages,
      remarkGfm,
      remarkEmoji,
      [
        remarkWikiLink,
        {
          aliasDivider: "||",
          pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
          hrefTemplate: (permalink) => `/blog/posts/${permalink}`,
        },
      ],
      [
        remarkEmbedder,
        {
          handleError,
          handleHTML,
          transformers: [
            [
              oembedTransformer,
              {
                theme: "dark",
                dnt: true,
                omit_script: true,
              },
            ],
          ],
        },
      ],
    ],
    rehypePlugins: [
      [rehypeImgSize, { dir: path.join(dir, "public") }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["header-link"],
          },
          test: (node) => node.tagName !== "h1",
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "dark-plus",
            light: "github-light",
          },
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    ppr: true,
  },
};

export default withMDX(nextConfig);
