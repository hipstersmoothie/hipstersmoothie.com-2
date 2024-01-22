"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      `
        z-50 overflow-hidden 
        rounded-sm border border-mauve-6 dark:border-mauvedark-6
        bg-mauve-2 dark:bg-mauvedark-2 
        px-2 py-1 text-xs 
        text-mauve-12 dark:text-mauvedark-12
        shadow-md 
        animate-in fade-in-0 zoom-in-95
          data-[state=closed]:animate-out 
          data-[state=closed]:fade-out-0 
          data-[state=closed]:zoom-out-95 
          data-[side=bottom]:slide-in-from-top-2
           data-[side=left]:slide-in-from-right-2 
           data-[side=right]:slide-in-from-left-2 
           data-[side=top]:slide-in-from-bottom-2
      `,
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

function Tooltip({
  title,
  children,
  asChild,
}: {
  title: string;
  children?: React.ReactNode;
  asChild?: boolean;
}) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </TooltipRoot>
  );
}

export {
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};
