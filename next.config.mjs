import nextMdx from "@next/mdx";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = nextMdx({
  options: {
    remarkPlugins: [remarkUnwrapImages, remarkGfm],
    rehypePlugins: [
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
