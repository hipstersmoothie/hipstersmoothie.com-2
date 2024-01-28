"use client";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-16 md:pb-24 in-preview:pb-4 relative">{children}</main>
  );
}
