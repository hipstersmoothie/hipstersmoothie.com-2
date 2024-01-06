"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { useIsInIframe } from "../lib/useIsInIframe";

function NavigationButton({ href, children }: { href: string; children: any }) {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname.startsWith(href) ? "default" : "ghost"}
      asChild={true}
      size="sm"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function NavigationHeader() {
  const inIframe = useIsInIframe();

  if (inIframe) {
    return null;
  }

  return (
    <div className="px-2 md:px-20">
      <nav className="flex items-center justify-between h-12 w-full max-w-screen-md mx-auto">
        <Button variant="ghost" size="sm" asChild={true}>
          <Link href="/">Andrew Lisowski</Link>
        </Button>

        <ol className="flex gap-4">
          <li>
            <NavigationButton href="/blog">Blog</NavigationButton>
          </li>
          <li>
            <NavigationButton href="/experiments">Experiments</NavigationButton>
          </li>
        </ol>
      </nav>
    </div>
  );
}
