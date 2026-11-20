import makeClass from "clsx";
import Link from "next/link";

import { Time } from "../../../components/ui/Time";
import { getBlogPost } from "../utils";

export async function PostHeader({
  className,
  slug,
}: {
  className?: string;
  slug: string;
}) {
  const post = await getBlogPost(slug);

  if (!post) {
    throw new Error(`Post ${slug} not found`);
  }

  // standard.site document verification: this <link> tag is hoisted into
  // <head> by Next.js. The document URI comes from each post's frontmatter
  // (written by `sequoia publish`). The site-wide publication discovery hint
  // lives in the root layout.
  const documentUri = post.frontMatter.atUri;

  return (
    <>
      {documentUri && (
        <link rel="site.standard.document" href={documentUri} />
      )}
      <div
        className="
          mb-8 md:mb-16
          in-preview:mb-4 in-preview:sticky in-preview:top-0 in-preview:z-1
        "
      >
        <div
          className="
            pt-10 pb-8 md:pt-16 md:pb-10 border-b border-hair
            in-preview:py-4 in-preview:px-0 in-preview:bg-ground
          "
        >
          <div className="max-w-[740px] px-6 mx-auto flex flex-col gap-4 md:gap-6 in-preview:gap-2">
            {post.frontMatter.tags && (
              <ul className="flex gap-2">
                {post.frontMatter.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/command?q=${encodeURIComponent(`#${tag}`)}`}
                      className="
                        text-xs in-preview:text-[11px]
                        rounded-full px-2 py-0.5
                        bg-ground-alt text-ink-2 hover:text-ink
                      "
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <h1
              className={makeClass(
                className,
                "headline text-[clamp(36px,5vw,60px)] in-preview:text-xl",
                "text-ink"
              )}
            >
              {post.title}
            </h1>
            <div className="text-[15px] flex flex-row gap-4 flex-1 in-preview:hidden">
              <div className="hidden sm:block">
                <span className="text-ink-2">
                  Created:{" "}
                </span>
                <Time
                  date={new Date(post.creationDate).toLocaleString()}
                  className="text-ink font-medium"
                />
              </div>
              <div>
                <span className="text-ink-2">
                  Updated:{" "}
                </span>
                <Time
                  date={new Date(post.lastUpdated).toLocaleString()}
                  className="text-ink font-medium"
                />
              </div>
              <div className="flex-1" />
              <div>
                <span className="text-ink-2">
                  {post.readingTime.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
