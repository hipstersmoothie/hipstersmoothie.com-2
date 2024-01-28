import path from "path";
import { matter } from "vfile-matter";
import { VFile } from "vfile";
import { capitalCase } from "change-case";

import { remark } from "remark";
import readingTime from "remark-reading-time";
import remarkWikiLink from "remark-wiki-link";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { PhrasingContent } from "mdast";

interface GitLoaderOutput {
  source: string;
  creationDate: string;
  lastUpdated: string;
  description?: string;
}

export const mdxProcessor = remark()
  // @ts-expect-error
  .use(readingTime, {})
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkWikiLink, {
    aliasDivider: "||",
    pageResolver: (name: string) => [name.replace(/ /g, "-").toLowerCase()],
    hrefTemplate: (permalink: string) => `/blog/posts/${permalink}`,
  });

interface FrontMatter {
  title?: string;
  creationDate: string;
  tags?: string[];
}

interface GetBlogPostListOptions {
  includeSource?: boolean;
}

async function parseBlogPost(
  filepath: string,
  { source, creationDate: creationDateStr, lastUpdated }: GitLoaderOutput,
  options: GetBlogPostListOptions = {}
) {
  const file = new VFile({
    path: filepath,
    value: source,
  });
  matter(file);
  await mdxProcessor.process(file);
  const frontMatter = file.data.matter as FrontMatter;

  const fileDir = filepath.replace("/page.mdx", "");
  const postSlug = path.basename(fileDir);
  const creationDate = new Date(frontMatter.creationDate || creationDateStr);

  if (typeof frontMatter.tags === "string") {
    frontMatter.tags = (frontMatter.tags as string)
      .split(",")
      .map((tag) => tag.trim());
  }

  return {
    title: frontMatter.title || capitalCase(postSlug),
    slug: postSlug,
    creationDate,
    lastUpdated: lastUpdated ? new Date(lastUpdated) : creationDate,
    frontMatter,
    source: options.includeSource ? source : undefined,
    readingTime: file.data.readingTime as {
      text: string;
      minutes: number;
      time: number;
      words: number;
    },
  };
}

const postContext = require.context(
  "!!../../lib/webpack-git-loader.js!./posts",
  true,
  /page\.mdx$/
);

export async function getBlogPostList({
  includeSource,
}: GetBlogPostListOptions = {}) {
  const posts = await Promise.all(
    postContext
      .keys()
      .map((key): [string, GitLoaderOutput] => [key, postContext(key).default])
      .map(([filepath, contents]) =>
        parseBlogPost(filepath, contents, { includeSource })
      )
  );

  return posts.sort(
    (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
  );
}

export type Post = Awaited<ReturnType<typeof getBlogPostList>>[number];

export function isBlogPost(value: unknown): value is Post {
  return typeof value === "object" && value !== null && "frontMatter" in value;
}

export async function getBlogPost(
  slug: string,
  options?: GetBlogPostListOptions
) {
  const filepath = postContext.keys().find((key) => key.includes(slug));

  if (!filepath) {
    throw new Error(`Could not find blog post with slug "${slug}"`);
  }

  const post: GitLoaderOutput = postContext(filepath).default;
  return parseBlogPost(filepath, post, options);
}

export function renderPhrase(value: PhrasingContent): string {
  if (value.type === "text") {
    return value.value;
  }

  if ((value as any).type === "wikiLink") {
    return (value as any).value;
  }

  if (
    value.type === "link" ||
    value.type === "emphasis" ||
    value.type === "strong"
  ) {
    return value.children.map(renderPhrase).join("");
  }

  return "";
}
