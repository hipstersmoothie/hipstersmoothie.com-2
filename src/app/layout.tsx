import type { Metadata } from "next";
import makeClass from "clsx";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { ThemeScript } from "next-app-theme/theme-script";

import { TooltipProvider } from "../components/ui/tooltip";
import { Toaster } from "../components/ui/sonner";
import { CommandPalletteLaunchCommand } from "../components/ui/CommandPalletteLaunchCommand";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hipstersmoothie.com",
  description: "Andrew Lisowski's personal website",
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://hipstersmoothie.com"
  ),
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <ThemeScript />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="/rss.xml"
            title="RSS Feed for hipstersmoothie.com"
          />
        </head>
        <body
          className={makeClass(
            GeistMono.variable,
            GeistSans.variable,
            "min-h-screen flex flex-col",
            "bg-mauve-1 dark:bg-mauvedark-1"
          )}
        >
          {children}
          {modal}
          <Toaster />
          <CommandPalletteLaunchCommand />
        </body>
      </html>
    </TooltipProvider>
  );
}
