import "server-only";

import { $ } from "execa";
import path from "path";

import { matter } from "vfile-matter";
import { read } from "to-vfile";
import { promises as fs } from "fs";
import { capitalCase } from "change-case";
import glob from "fast-glob";

import { remark } from "remark";
import readingTime from "remark-reading-time";
import remarkWikiLink from "remark-wiki-link";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { PhrasingContent } from "mdast";

export const mdxProcessor = remark()
  .use(readingTime, {})
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkEmoji)
  .use(remarkWikiLink, {
    aliasDivider: "||",
    pageResolver: (name: string) => [name.replace(/ /g, "-").toLowerCase()],
    hrefTemplate: (permalink: string) => `/blog/posts/${permalink}`,
  });

const dir = path.dirname(import.meta.url).replace("file://", "");

interface FrontMatter {
  title?: string;
  creationDate: string;
}

interface GetBlogPostListOptions {
  includeSource?: boolean;
}

export async function getBlogPostList({
  includeSource,
}: GetBlogPostListOptions = {}) {
  const posts = await Promise.all(
    glob
      .sync(`${dir}/posts/**/*.mdx`, {
        deep: 2,
      })
      .map(async (filepath) => {
        const file = await read(filepath);
        matter(file);
        await mdxProcessor.process(file);
        const frontMatter = file.data.matter as FrontMatter;

        const fileDir = filepath.replace("/page.mdx", "");
        const postSlug = path.basename(fileDir);
        const postPath = fileDir
          .replace(`${dir}/posts/`, "")
          .replace(".mdx", "");

        const { birthtime } = await fs.stat(filepath);
        const { stdout } =
          await $`git log --diff-filter=A --format=%aI ${filepath}`;
        const creationDate = new Date(
          frontMatter.creationDate || stdout || birthtime
        );
        // get the last updated time from git
        const { stdout: lastUpdated } =
          await $`git log -1 --format=%aI ${filepath}`;

        return {
          title: frontMatter.title || capitalCase(postSlug),
          path: postPath,
          creationDate,
          lastUpdated: lastUpdated ? new Date(lastUpdated) : creationDate,
          frontMatter,
          source: includeSource ? file.toString() : undefined,
          readingTime: file.data.readingTime as {
            text: string;
            minutes: number;
            time: number;
            words: number;
          },
        };
      })
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
  const posts = await getBlogPostList(options);
  return posts.find((post) => post.path === slug);
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
