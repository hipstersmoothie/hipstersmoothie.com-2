"use client";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-4">
      {children}
      <div className="h-20 hide-in-iframe" />
    </main>
  );
}
