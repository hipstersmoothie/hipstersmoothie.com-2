"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";

import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "./dialog";
import { usePathname, useRouter } from "next/navigation";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      `
        flex h-full w-full flex-col 
        overflow-hidden rounded-md 
        bg-mauve-1 dark:bg-mauvedark-1
        text-mauve-12 dark:text-mauvedark-12
      `,
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialogCloseContext = React.createContext<() => void>(() => {});
export const useCommandDialogClose = () =>
  React.useContext(CommandDialogCloseContext);

const CommandDialog = ({ children, open, ...props }: CommandDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openState, setOpenState] = React.useState(open);
  const onClose = React.useCallback(() => {
    setOpenState(false);
    router.back();
  }, [router]);

  React.useEffect(() => {
    setOpenState(pathname == "/command");
  }, [pathname, onClose]);

  return (
    <CommandDialogCloseContext.Provider value={onClose}>
      <Dialog
        {...props}
        open={openState}
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            onClose();
          }
        }}
      >
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <Command
            className="
            [&_[cmdk-group-heading]]:px-2
            [&_[cmdk-group-heading]]:font-medium
            [&_[cmdk-group-heading]]:text-muted-foreground
            [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
            [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5
            [&_[cmdk-input-wrapper]_svg]:w-5
            [&_[cmdk-input]]:h-12
            [&_[cmdk-item]_svg]:h-5
            [&_[cmdk-item]_svg]:w-5"
          >
            {children}
          </Command>
        </DialogContent>
      </Dialog>
    </CommandDialogCloseContext.Provider>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, value, ...props }, ref) => {
  const router = useRouter();
  const [inputValue, setInputValue] = React.useState(value);
  const onUpdateSearch = React.useMemo(() => {
    const updateUrl = debounce((value: string) => {
      // update the url with query param
      // if value is empty, remove the query param
      const url = new URL(window.location.href);

      if (value) {
        url.searchParams.set("q", value);
      } else {
        url.searchParams.delete("q");
      }

      router.replace(url.pathname + url.search);
    }, 100);

    return (value: string) => {
      setInputValue(value);
      updateUrl(value);
    };
  }, [router]);

  return (
    <div
      className="
        flex items-center px-3
        border-b border-mauve-7 dark:border-mauvedark-7
      "
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-3 w-3 p-0.5 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          `
            flex h-11 w-full rounded-md 
            bg-transparent py-3 text-sm outline-none 
            placeholder:text-mauve-11 dark:placeholder-text-mauvedark-11
            disabled:cursor-not-allowed disabled:opacity-50
          `,
          className
        )}
        {...props}
        value={inputValue}
        onValueChange={onUpdateSearch}
      />
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      ` 
        overflow-hidden p-1 
        text-mauve-12 dark:text-mauvedark-12
        [&_[cmdk-group-heading]]:px-2.5
        [&_[cmdk-group-heading]]:py-1.5
        [&_[cmdk-group-heading]]:text-xs
        [&_[cmdk-group-heading]]:font-medium
        [&_[cmdk-group-heading]]:text-mauve-11 dark:[&_[cmdk-group-heading]]:text-mauvedark-11
      `,
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-mauve-7 dark:bg-mauvedark-7", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      `
        relative cursor-default select-none
        flex items-center rounded-sm px-2.5 py-2
        text-sm outline-none
        aria-selected:bg-mauve-4 dark:aria-selected:bg-mauvedark-4
        aria-selected:text-accent-foreground
        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50
      `,
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
