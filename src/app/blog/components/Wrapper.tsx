"use client";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <main className="pb-4 in-preview:pb-24 relative">{children}</main>;
}
