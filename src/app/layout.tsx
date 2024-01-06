import type { Metadata } from "next";
import Script from "next/script";
import makeClass from "clsx";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { getTheme } from "../lib/get-theme";

import "./globals.css";

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
        <Script id="theme">{getTheme}</Script>
      </head>
      <body className={makeClass(GeistMono.variable, GeistSans.variable)}>
        {children}
      </body>
    </html>
  );
}
