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

  return (
    <>
      <div
        className="
          mb-8 md:mb-16
          in-preview:mb-4 in-preview:sticky in-preview:top-0 in-preview:z-1
        "
      >
        <div
          className="
         bg-mauve-4  dark:bg-mauvedark-3 
            py-5 md:py-12 md:px-24
            in-preview:py-4 in-preview:px-0
          "
        >
          <div className="max-w-prose px-4 mx-auto flex flex-col gap-4 md:gap-6 in-preview:gap-2">
            {post.frontMatter.tags && (
              <ul className="flex gap-2">
                {post.frontMatter.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/command?q=${encodeURIComponent(`#${tag}`)}`}
                      className="
                        text-sm in-preview:text-xs
                        rounded-lg px-2 py-1
                        bg-crimsona-4 dark:bg-crimsondarka-4
                        text-crimsona-12 dark:text-crimsondarka-12
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
                "text-3xl md:text-5xl in-preview:text-xl font-medium",
                "text-mauve-12 dark:text-mauvedark-12"
              )}
            >
              {post.title}
            </h1>
            <div className="text-sm flex flex-row gap-4 flex-1 in-preview:hidden">
              <div className="hidden sm:block">
                <span className="italic text-mauve-12 dark:text-mauvedark-12">
                  Created:{" "}
                </span>
                <Time
                  date={new Date(post.creationDate).toLocaleString()}
                  className="text-mauve-11 dark:text-mauvedark-11 font-medium"
                />
              </div>
              <div>
                <span className="italic text-mauve-12 dark:text-mauvedark-12">
                  Updated:{" "}
                </span>
                <Time
                  date={new Date(post.lastUpdated).toLocaleString()}
                  className="text-mauve-11 dark:text-mauvedark-11 font-medium"
                />
              </div>
              <div className="flex-1" />
              <div>
                <span className="text-mauve-11 dark:text-mauvedark-11">
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
