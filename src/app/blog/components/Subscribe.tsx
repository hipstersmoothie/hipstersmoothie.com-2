import makeClass from "clsx";
import { twMerge } from "tailwind-merge";

const SUBSCRIBE_URL = "https://standard-reader.app/subscribe/did:plc:m2sjv3wncvsasdapla35hzwj/3mng7bqymfo2w";

export function SubscribeButton({ className }: { className?: string }) {
  return (
    <a
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={makeClass(
        className,
        "pill pill-quiet no-underline" 
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
        "max-w-[740px] mx-auto px-6 my-12 in-preview:hidden",
        className
      )}
    >
      <div
        className="
          flex flex-col gap-3 items-start
          rounded-tile p-7
          bg-ground-alt
        "
      >
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
          Enjoying the blog?
        </h2>
        <p className="text-ink-2">
          Subscribe to get new posts delivered straight to wherever you read standard.site publications.
        </p>
        <SubscribeButton />
      </div>
    </div>
  );
}
