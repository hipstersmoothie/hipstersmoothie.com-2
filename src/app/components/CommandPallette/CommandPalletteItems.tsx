"use client";

import { useRouter } from "next/navigation";
import {
  CommandItem,
  useCommandDialogClose,
} from "../../../components/ui/command";

export function CommandPalletteLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const closeCommandPallette = useCommandDialogClose();
  const router = useRouter();

  return (
    <CommandItem
      onSelect={() => {
        closeCommandPallette();

        if (external) {
          window.open(href, "_blank");
        } else {
          router.push(href);
        }
      }}
    >
      {children}
    </CommandItem>
  );
}
