import type { Metadata } from "next";
import makeClass from "clsx";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { ThemeScript } from "next-app-theme/theme-script";

import "./globals.css";
import { IframeScript } from "../lib/IframeScript";

export const metadata: Metadata = {
  title: "Hipstersmoothie.com",
  description: "Andrew Lisowski's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <IframeScript />
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
      </body>
    </html>
  );
}
