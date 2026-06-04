import makeClass from "clsx";
import { twMerge } from "tailwind-merge";

const SUBSCRIBE_URL =
  "https://sequoia.pub/subscribe?publicationUri=at%3A%2F%2Fdid%3Aplc%3Am2sjv3wncvsasdapla35hzwj%2Fsite.standard.publication%2F3mng7bqymfo2w";

export function SubscribeButton({ className }: { className?: string }) {
  return (
    <a
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={makeClass(
        className,
        `
          inline-flex items-center justify-center
          rounded-lg px-4 py-2 font-medium no-underline
          bg-crimson-9 dark:bg-crimsondark-9
          text-crimson-1 dark:text-crimsondark-12
          hover:bg-crimson-10 dark:hover:bg-crimsondark-10
          transition-colors
        `
      )}
    >
      Subscribe
    </a>
  );
}

export function Subscribe({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        "max-w-prose mx-auto px-4 my-10 in-preview:hidden",
        className
      )}
    >
      <div
        className="
          flex flex-col gap-3 items-start
          rounded-lg p-6
          bg-mauve-3 dark:bg-mauvedark-3
          border border-mauve-6 dark:border-mauvedark-6
        "
      >
        <h2 className="text-xl font-medium text-mauve-12 dark:text-mauvedark-12">
          Enjoying the blog?
        </h2>
        <p className="text-mauve-11 dark:text-mauvedark-11">
          Subscribe to get new posts delivered straight to wherever you read standard.site publications.
        </p>
        <SubscribeButton />
      </div>
    </div>
  );
}
