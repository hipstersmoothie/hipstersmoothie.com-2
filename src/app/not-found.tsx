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
        bg-ground text-ink
        h-screen w-screen
        flex flex-col items-center justify-center gap-4
      "
    >
      <div
        className="
          rounded-2xl squircle p-3 inline-block
          bg-ground-alt text-ink-2
        "
      >
        <FileQuestion size={40} />
      </div>
      <h2 className="headline text-4xl">Not Found</h2>
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
