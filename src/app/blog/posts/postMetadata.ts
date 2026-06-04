import type { Metadata } from "next";

interface PostFrontmatter {
  title: string;
  description?: string;
}

/**
 * Builds per-post page metadata from a post's frontmatter. `remark-mdx-frontmatter`
 * exposes the frontmatter as a `frontmatter` export in every `page.mdx`, so each
 * post can do `export const metadata = getPostMetadata(frontmatter)`.
 *
 * Without this, posts fall back to the root layout's metadata and ship with a
 * missing/generic og:title and og:description.
 */
export function getPostMetadata(frontmatter: PostFrontmatter): Metadata {
  const { title, description } = frontmatter;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
