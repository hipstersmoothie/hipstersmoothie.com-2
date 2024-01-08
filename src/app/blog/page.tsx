import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { RelativeTime } from "../../components/ui/RelativeTime";
import { PageHeader } from "../../components/ui/PageHeader";
import { Post, getBlogPostList } from "./utils";

function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/posts/${post.path}`}
      className="
        group
        flex justify-between gap-2
        min-h-11 py-2 px-4 -mx-4 relative z-0 
      "
    >
      <div
        className="
          absolute inset-[1px] rounded z-[-1]
          opacity-0 transition-opacity group-hover:opacity-100 duration-75
        bg-sage-3 dark:bg-sagedark-3
        "
      />
      <h2
        className="
          text-lg md:text-xl font-medium
          text-sage-12 dark:text-sagedark-12
        "
      >
        {post.title}
      </h2>
      <span
        className="
          flex-shrink-0 text-sm flex items-center
          text-sage-11 dark:text-sagedark-11
        "
      >
        <RelativeTime date={post.creationDate} />
      </span>
    </Link>
  );
}

export default async function PostList() {
  const posts = await getBlogPostList();

  return (
    <>
      <NavigationHeader />
      <PageHeader>Blog</PageHeader>
      <main className="flex flex-col items-center justify-between p-5 md:px-24 md:py-12">
        <ol className="flex flex-col w-full max-w-screen-md">
          {posts.map((post) => (
            <li key={post.path}>
              <PostItem post={post} />
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
