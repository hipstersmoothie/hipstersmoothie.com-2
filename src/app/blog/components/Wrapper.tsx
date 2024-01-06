"use client";

import makeClass from "clsx";
import { useIsInIframe } from "../../../lib/useIsInIframe";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const inIframe = useIsInIframe();

  return (
    <main className={makeClass(inIframe ? "pb-4" : "pb-24")}>{children}</main>
  );
}
