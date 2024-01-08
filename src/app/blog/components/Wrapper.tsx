"use client";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <main className="pb-24 in-preview:pb-4 relative">{children}</main>;
}
