import makeClass from "clsx";
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
          <div className="max-w-prose px-4 mx-auto flex flex-col gap-4 md:gap-6">
            <h1
              className={makeClass(
                className,
                "text-3xl md:text-5xl in-preview:text-xl",
                "text-mauve-12 dark:text-mauvedark-12"
              )}
            >
              {post.title}
            </h1>
            <div className="sm:flex items-baseline justify-between in-preview:hidden">
              <div className="space-x-4 md:space-y-0 text-sm flex flex-row">
                <div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
