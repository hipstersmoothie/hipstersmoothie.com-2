"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function CommandPalletteLaunchCommand() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function onShortcut(e: KeyboardEvent) {
      if (e.key === "k" && e.metaKey && pathname !== "/command") {
        router.push("/command");
      }
    }

    window.addEventListener("keydown", onShortcut);

    return () => window.removeEventListener("keydown", onShortcut);
  }, [router, pathname]);

  return null;
}
