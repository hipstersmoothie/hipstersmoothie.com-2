import path from "path";
import { MDXRemote } from "@alisowski/next-mdx-remote/rsc";

import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkEmoji from "remark-emoji";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeImgSize from "rehype-img-size";

import { getBlogPostList } from "../utils";
import {
  Blockquote,
  BlogPostTitle,
  Code,
  H2,
  H3,
  H4,
  H5,
  H6,
  HorizontalRule,
  Link,
  MdxImage,
  OrderedList,
  Paragraph,
  PostDataContextProvider,
  Pre,
  TD,
  TH,
  Table,
  UnorderedList,
} from "../../../components/ui/typography";

const dir = path.dirname(import.meta.url).replace("file://", "");

export default async function BlogPost({
  params,
}: {
  params: { slug: String };
}) {
  const posts = await getBlogPostList({ includeSource: true });
  const post = posts.find((post) => post.path === params.slug);

  if (!post) {
    return <div>Not found</div>;
  }

  return (
    <PostDataContextProvider value={{ ...post, source: "" }}>
      <MDXRemote
        source={post.source || ""}
        components={{
          p: Paragraph,
          img: MdxImage,
          blockquote: Blockquote,
          hr: HorizontalRule,
          ol: OrderedList,
          ul: UnorderedList,
          code: Code,
          pre: Pre,
          a: Link,
          h1: BlogPostTitle,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          table: Table,
          td: TD,
          th: TH,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkFrontmatter,
              remarkMdxFrontmatter,
              remarkUnwrapImages,
              remarkGfm,
              remarkEmoji,
              [
                remarkWikiLink,
                {
                  aliasDivider: "||",
                  pageResolver: (name: string) => [
                    name.replace(/ /g, "-").toLowerCase(),
                  ],
                  hrefTemplate: (permalink: string) =>
                    `/blog/posts/${permalink}`,
                },
              ],
            ],
            rehypePlugins: [
              [
                // TODO: the types for rehype-img-size are wrong
                rehypeImgSize as unknown as typeof rehypeSlug,
                { dir: path.join(dir, "../../../../", "public") },
              ],
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["header-link"],
                  },
                  test: (node: HTMLElement) => node.tagName !== "h1",
                },
              ],
              [
                rehypePrettyCode,
                {
                  theme: {
                    dark: "github-dark",
                    light: "github-light",
                  },
                },
              ],
            ],
          },
        }}
      />
    </PostDataContextProvider>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPostList();

  return posts.map(async (post) => ({
    slug: post.path,
  }));
}
