"use client";

import makeClass from "clsx";
import { useIsInIframe } from "../../../lib/useIsInIframe";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const inIframe = useIsInIframe();

  return (
    <main
      className={makeClass(
        "max-w-prose mx-auto px-4",
        inIframe ? "pb-4" : "py-12 md:py-16"
      )}
    >
      {children}
    </main>
  );
}
