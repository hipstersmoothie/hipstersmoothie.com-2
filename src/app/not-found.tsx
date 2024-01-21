"use client";

import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "../components/ui/button";
import { usePathname } from "next/navigation";
import { Code } from "../components/ui/typography";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div
      className="
        bg-mauve-1 dark:bg-mauvedark-1
        h-screen w-screen
        flex flex-col items-center justify-center gap-4
      "
    >
      <div
        className="
          text-xs rounded-lg p-3 inline-block translate-y-[-1px]
          bg-crimsona-5 dark:bg-crimsondarka-4
          text-crimsona-12 dark:text-crimsondarka-12
        "
      >
        <FileQuestion size={40} />
      </div>
      <h2 className="text-3xl font-medium">Not Found</h2>
      <div className="flex flex-col items-center gap-6 text-xl">
        <p>
          <Code className="text-xl">{pathname}</Code> doesn&apos;t exist!
        </p>
        <Button asChild={true} size="sm">
          <Link href="/">Go to homepage</Link>
        </Button>
      </div>
    </div>
  );
}
