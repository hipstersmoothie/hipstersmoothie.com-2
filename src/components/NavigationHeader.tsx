"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

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
  return (
    <nav className="flex items-center justify-between h-12 max-w-screen-lg mx-auto px-2">
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
  );
}
