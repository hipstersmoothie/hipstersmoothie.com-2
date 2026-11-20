import Link from "next/link";
import { format } from "date-fns/format";
import { getYear } from "date-fns/getYear";

import { NavigationHeader } from "../../components/NavigationHeader";
import { PageHeader } from "../../components/ui/PageHeader";
import { Post, getBlogPostList } from "./utils";
import { Footer } from "../../components/Footer";
import { SubscribeButton } from "./components/Subscribe";

function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/blog/posts/${post.slug}`} className="row">
      <span className="row-title">{post.title}</span>
      <span className="row-meta">{format(post.creationDate, "MMM d")}</span>
      {post.frontMatter.description && <span className="row-sub">{post.frontMatter.description}</span>}
      {post.frontMatter.tags && (
        <span className="flex flex-wrap gap-1.5 sm:col-start-1 mt-1">
          {post.frontMatter.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-ground-alt text-ink-2">
              {tag}
            </span>
          ))}
        </span>
      )}
    </Link>
  );
}

export default async function PostList() {
  const posts = await getBlogPostList();
  const years = new Map<number, Post[]>();
  for (const post of posts) {
    const year = getYear(post.creationDate);
    years.set(year, [...(years.get(year) ?? []), post]);
  }

  return (
    <>
      <NavigationHeader />
      <PageHeader
        action={<SubscribeButton className="flex-shrink-0" />}
      >
        Writing
      </PageHeader>
      <main className="pb-16">
        <div className="max-w-[1180px] mx-auto px-6">
          {Array.from(years.entries()).map(([year, yearPosts]) => (
            <section key={year}>
              <p className="pt-10 pb-2 text-[13px] font-semibold text-ink-3">{year}</p>
              <ol className="rows">
                {yearPosts.map((post) => (
                  <li key={post.slug}>
                    <PostItem post={post} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
