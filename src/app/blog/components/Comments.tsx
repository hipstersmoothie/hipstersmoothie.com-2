"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sequoia-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "document-uri"?: string;
          "post-uri"?: string;
          depth?: string | number;
          hide?: string;
        },
        HTMLElement
      >;
    }
  }
}

/**
 * Maps a blog post slug to an explicit Bluesky post to use for comments.
 *
 * Used for posts whose `site.standard.document` record has no `bskyPostRef`
 * (e.g. articles published before Sequoia's Bluesky posting existed, where we
 * want to attach a pre-existing announcement thread). Sequoia only ever creates
 * *new* posts, so this is how we point an old post at its existing discussion.
 *
 * Posts not listed here fall back to auto-detection via the
 * `<link rel="site.standard.document">` tag + the document's `bskyPostRef`.
 */
const POST_URI_OVERRIDES: Record<string, string> = {
  "using-bluesky-labelers-to-show-campaign-funding-data":
    "at://did:plc:m2sjv3wncvsasdapla35hzwj/app.bsky.feed.post/3lbl2lgnq7c2f",
  "vscode-turborepo-jest-debugging":
    "at://did:plc:m2sjv3wncvsasdapla35hzwj/app.bsky.feed.post/3la3uba53hm2j",
};

function slugFromPathname(pathname: string): string {
  return pathname.replace(/\/+$/, "").split("/").pop() ?? "";
}

/**
 * Renders Bluesky replies as a comments section for the current post.
 *
 * The `<sequoia-comments>` web component reads the
 * `<link rel="site.standard.document" href="at://...">` tag that `PostHeader`
 * injects, follows the document's `bskyPostRef`, and renders the thread. Posts
 * without a linked Bluesky post stay silent (see the `hide="auto"` patch in
 * `sequoia-comments.js`), unless they have a `POST_URI_OVERRIDES` entry.
 */
export function Comments({ className }: { className?: string }) {
  const pathname = usePathname();
  const postUriOverride = POST_URI_OVERRIDES[slugFromPathname(pathname)];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    // The web component touches `document`/`customElements`, so it can only be
    // registered on the client.
    import("./sequoia-comments.js").then(() => {
      if (active) {
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "max-w-prose mx-auto px-4 my-10 in-preview:hidden",
        // Theme the (shadow DOM) component to match the site. These custom
        // properties pierce the shadow boundary via inheritance.
        "[--sequoia-bg-color:transparent]",
        "[--sequoia-border-radius:0.5rem]",
        "[--sequoia-fg-color:theme(colors.mauve.12)] dark:[--sequoia-fg-color:theme(colors.mauvedark.12)]",
        "[--sequoia-border-color:theme(colors.mauve.6)] dark:[--sequoia-border-color:theme(colors.mauvedark.6)]",
        "[--sequoia-secondary-color:theme(colors.mauve.11)] dark:[--sequoia-secondary-color:theme(colors.mauvedark.11)]",
        "[--sequoia-accent-color:theme(colors.crimson.9)] dark:[--sequoia-accent-color:theme(colors.crimsondark.9)]",
        className
      )}
    >
      {/* Re-mount on navigation so the thread reloads for the new post's
          document link tag during client-side route changes. */}
      {postUriOverride ? (
        <sequoia-comments key={pathname} depth="6" post-uri={postUriOverride} />
      ) : (
        <sequoia-comments key={pathname} depth="6" hide="auto" />
      )}
    </div>
  );
}
