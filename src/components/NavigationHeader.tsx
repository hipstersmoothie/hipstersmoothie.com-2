"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "./ui/button";
import dynamic from "next/dynamic";

const SetThemeButton = dynamic(() => import("./ui/SetThemeButton"), {
  ssr: false,
  loading: () => <div className="w-9 h-9" />,
});

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
    <div className="px-2 md:px-20">
      <nav className="flex items-center gap-4 justify-between h-12 w-full max-w-screen-md mx-auto">
        <div className="flex items-center gap-2 flex-1">
          <Button variant="ghost" size="sm" asChild={true}>
            <Link href="/">
              <span className="md:hidden">AL</span>
              <span className="hidden md:inline">Andrew Lisowski</span>
            </Link>
          </Button>
          <Link
            href="/command"
            className="
              hidden md:flex items-center justify-center
              border rounded-sm border-mauve-7 dark:border-mauvedark-7
              px-2 py-1 text-xs mono
              self-center
              hover:border-mauve-8 dark:hover:border-mauvedark-8
              hover:bg-mauve-4 dark:hover:bg-mauvedark-4
              cursor-default
            "
          >
            ⌘K
          </Link>
        </div>
        <div className="flex gap-1 md:gap-4">
          <ol className="flex gap-1 md:gap-4">
            <li>
              <NavigationButton href="/blog">Blog</NavigationButton>
            </li>
            <li>
              <NavigationButton href="/experiments">
                Experiments
              </NavigationButton>
            </li>
          </ol>
          <Button
            asChild={true}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Link href="/command">
              <Search className="h-4 -mt-0.5" />
            </Link>
          </Button>
          <SetThemeButton />
        </div>
      </nav>
    </div>
  );
}
