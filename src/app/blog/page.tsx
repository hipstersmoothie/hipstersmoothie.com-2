import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { RelativeTime } from "../../components/ui/RelativeTime";
import { PageHeader } from "../../components/ui/PageHeader";
import { Post, getBlogPostList } from "./utils";

function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/posts/${post.path}`}
      className="flex justify-between gap-2 min-h-11 py-2 px-4 -mx-4 relative z-0 group"
    >
      <div className="bg-gray-100 dark:bg-gray-800 absolute inset-[1px] rounded z-[-1] opacity-0 transition-opacity group-hover:opacity-100 duration-75" />
      <h2 className="text-lg md:text-xl font-medium dark:text-gray-200 dark:group-hover:text-gray-200">
        {post.title}
      </h2>
      <span className="text-gray-500 dark:group-hover:text-gray-200 flex-shrink-0 text-sm flex items-center">
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
