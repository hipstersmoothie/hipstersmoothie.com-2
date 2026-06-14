export function Collapsible({
  summary = "Full write-up",
  children,
}: {
  summary?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="max-w-prose mx-auto px-4 my-4 rounded-lg border border-mauve-6 dark:border-mauvedark-6">
      <summary className="cursor-pointer select-none px-0 py-2 font-medium list-none text-mauve-11 dark:text-mauvedark-11 [&::-webkit-details-marker]:hidden">
        {summary}
      </summary>
      <div className="pb-2 [&>div]:!px-0 [&_p:first-of-type]:!mt-2">{children}</div>
    </details>
  );
}
