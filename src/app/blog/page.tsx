import Link from "next/link";

import { NavigationHeader } from "../../components/NavigationHeader";
import { RelativeTime } from "../../components/ui/RelativeTime";
import { PageHeader } from "../../components/ui/PageHeader";
import { Post, getBlogPostList } from "./utils";
import { Footer } from "../../components/Footer";
import { Backlink } from "../../components/ui/typography";
import { PostPreview } from "../../components/ui/Link";

function PostItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
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
        bg-mauve-3 dark:bg-mauvedark-3
        "
      />
      <h2
        className="
          text-lg md:text-xl font-medium
          text-mauve-12 dark:text-mauvedark-12
        "
      >
        {post.title}
      </h2>
      <span
        className="
          flex-shrink-0 text-sm flex items-center
          text-mauve-11 dark:text-mauvedark-11
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
      <PageHeader
        subtitle={
          <>
            A collection of disorganized interconnected notes on front-end, dev
            tools, home automation and podcasting. Be on the lookout for the
            special pink links{" "}
            <Backlink
              href="/blog/posts/devtools-fm"
              preview={<PostPreview slug="devtools-fm" />}
            >
              like this.
            </Backlink>
          </>
        }
      >
        Blog
      </PageHeader>
      <main className="flex flex-col items-center justify-between p-5 md:px-24 md:py-12 md:pb-20">
        <ol className="flex flex-col w-full max-w-screen-md">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostItem post={post} />
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  );
}
