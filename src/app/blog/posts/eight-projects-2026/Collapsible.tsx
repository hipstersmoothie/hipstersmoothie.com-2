export function Collapsible({
  summary = "Full write-up",
  children,
}: {
  summary?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="max-w-[740px] mx-auto px-6 my-5">
      <summary className="cursor-pointer select-none px-0 py-2 font-medium list-none text-ink-2 hover:text-ink [&::-webkit-details-marker]:hidden">
        {summary}
      </summary>
      <div className="pb-2 [&>div]:!px-0 [&_p:first-of-type]:!mt-2">{children}</div>
    </details>
  );
}
