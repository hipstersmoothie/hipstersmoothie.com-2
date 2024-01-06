import { $ } from "execa";
import path from "path";
import { cache } from "react";

import { matter } from "vfile-matter";
import { read } from "to-vfile";
import { promises as fs } from "fs";
import { capitalCase } from "change-case";
import glob from "fast-glob";

const dir = path.dirname(import.meta.url).replace("file://", "");

export type Post = {
  name: string;
  path: string;
  creationDate: Date;
  lastUpdated: Date;
  frontMatter: {
    creationDate: string;
  };
  source?: string;
};

export const getBlogPostList = cache(async function getBlogPostList({
  includeSource,
}: { includeSource?: boolean } = {}) {
  const posts = await Promise.all(
    glob
      .sync(`${dir}/posts/**/*.mdx`, {
        deep: 2,
      })
      .map(async (filepath) => {
        const file = await read(filepath);
        matter(file);
        const frontMatter = file.data.matter as Post["frontMatter"];

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
          name: capitalCase(postSlug),
          path: postPath,
          creationDate,
          lastUpdated: lastUpdated ? new Date(lastUpdated) : creationDate,
          frontMatter,
          source: includeSource ? file.toString() : undefined,
        };
      })
  );

  return posts.sort(
    (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
  );
});
