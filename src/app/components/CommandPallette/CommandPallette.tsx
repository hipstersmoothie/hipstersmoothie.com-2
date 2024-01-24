import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "../../../components/ui/command";

import { CommandPalletteLink } from "./CommandPalletteItems";
import resume from "../../resume.json";

export async function CommandPallette() {
  return (
    <CommandDialog>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sections">
          <CommandPalletteLink href="/">Resume</CommandPalletteLink>
          <CommandPalletteLink href="/blog">Blog</CommandPalletteLink>
          <CommandPalletteLink href="/experiments">
            Experiments
          </CommandPalletteLink>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Socials">
          {resume.basics.profiles.map((profile) => (
            <CommandPalletteLink
              external
              key={profile.network}
              href={profile.url}
            >
              {profile.label}
            </CommandPalletteLink>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
