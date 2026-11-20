"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import makeClass from "clsx";
import dynamic from "next/dynamic";

const SetThemeButton = dynamic(() => import("./ui/SetThemeButton"), {
  ssr: false,
  loading: () => <div className="w-8 h-8" />,
});

function NavigationLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const current = pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={makeClass(
        className,
        "text-[13px] text-ink transition-opacity",
        current ? "font-semibold opacity-100" : "opacity-80 hover:opacity-100"
      )}
    >
      {children}
    </Link>
  );
}

/** Sticky, translucent, grey. The one piece of chrome on every page. */
export function NavigationHeader() {
  return (
    <div className="sticky top-0 z-20 bg-nav backdrop-blur-xl backdrop-saturate-150 border-b border-hair">
      <nav className="flex items-center gap-6 h-[52px] w-full max-w-[1180px] mx-auto px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-ink"
        >
          <Image
            src="/profile.jpeg"
            width={48}
            height={48}
            alt=""
            className="w-6 h-6 rounded-full"
          />
          <span className="md:hidden">Andrew</span>
          <span className="hidden md:inline">Andrew Lisowski</span>
        </Link>
        <div className="ml-auto flex items-center gap-5 md:gap-[22px]">
          <NavigationLink href="/projects">Projects</NavigationLink>
          <NavigationLink href="/blog">Writing</NavigationLink>
          <Link
            href="/command"
            aria-label="Search"
            className="
              hidden md:inline-flex items-center h-[22px] px-[7px]
              border border-hair rounded-md squircle
              font-mono text-[11px] text-ink-2 hover:text-ink
            "
          >
            ⌘K
          </Link>
          <Link
            href="/command"
            aria-label="Search"
            className="md:hidden inline-flex items-center justify-center w-8 h-8 text-ink"
          >
            <Search size={18} />
          </Link>
          <SetThemeButton />
        </div>
      </nav>
    </div>
  );
}
