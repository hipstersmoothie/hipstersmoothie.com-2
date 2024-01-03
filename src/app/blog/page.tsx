import glob from "fast-glob";
import path from "path";
import { promises as fs } from "fs";
import { capitalCase } from "change-case";
import Link from "next/link";
import { $ } from "execa";
import { matter } from "vfile-matter";
import { read } from "to-vfile";

import { NavigationHeader } from "../../components/NavigationHeader";
import { RelativeTime } from "../../components/ui/RelativeTime";
import { H1 } from "../../components/ui/typography";
import { PageHeader } from "../../components/ui/PageHeader";

const dir = path.dirname(import.meta.url).replace("file://", "");

type Post = {
  name: string;
  path: string;
  creationDate: Date;
  lastUpdated: Date;
  frontMatter: {
    creationDate: string;
  };
};

function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.path}`}
      className="flex justify-between gap-2 min-h-11 py-2"
    >
      <h2 className="text-lg md:text-xl font-medium">{post.name}</h2>
      <span className="text-gray-500 flex-shrink-0 text-sm flex items-center">
        <RelativeTime date={post.creationDate} />
      </span>
    </Link>
  );
}

export default async function PostList() {
  const posts = await Promise.all(
    glob
      .sync(`${dir}/posts/**/page.mdx`, {
        deep: 2,
      })
      .map(async (filepath) => {
        const file = await read(filepath);
        matter(file);
        const frontMatter = file.data.matter as Post["frontMatter"];

        const fileDir = filepath.replace("/page.mdx", "");
        const postSlug = path.basename(fileDir);
        const postPath = fileDir.replace(`${dir}/`, "");

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
        };
      })
  );
  const sortedPosts = posts.sort(
    (a, b) => b.creationDate.getTime() - a.creationDate.getTime()
  );

  return (
    <>
      <NavigationHeader />
      <PageHeader>Blog</PageHeader>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:px-24 md:py-12">
        <ol className="flex flex-col w-full max-w-screen-md">
          {sortedPosts.map((post) => (
            <li key={post.path}>
              <PostItem post={post} />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
