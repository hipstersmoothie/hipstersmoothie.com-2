import nextMdx from "@next/mdx";

import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkWikiLink from "remark-wiki-link";

const withMDX = nextMdx({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkUnwrapImages,
      remarkGfm,
      [
        remarkWikiLink,
        {
          pageResolver: (name) => [name.replace(/ /g, "-").toLowerCase()],
          hrefTemplate: (permalink) => `/blog/posts/${permalink}`,
        },
      ],
    ],
    rehypePlugins: [
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
            dark: "github-light",
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
};

export default withMDX(nextConfig);
