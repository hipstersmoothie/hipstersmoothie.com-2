"use client";

import { useTheme } from "next-app-theme/use-theme";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      gap={4}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast: `
            group toast 
            group-[.toaster]:bg-mauve-1 dark:group-[.toaster]:bg-mauvedark-1
            group-[.toaster]:text-mauve-12 dark:group-[.toaster]:text-mauvedark-12 
            group-[.toaster]:border-mauve-5 dark:group-[.toaster]:border-mauvedark-5 
            group-[.toaster]:shadow-lg group-[.toaster]:rounded
            group-[.toaster]:px-3 group-[.toaster.toaster]:py-3
          `,
          description: "group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
