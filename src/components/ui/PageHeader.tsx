import makeClass from "clsx";

/** The top of an index page: a big headline, an optional lede, an optional action. Grey. */
export function PageHeader({
  className,
  subtitle,
  action,
  ...props
}: React.ComponentPropsWithoutRef<"h1"> & {
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="pt-14 pb-10 md:pt-[72px]">
      <div className="max-w-[1180px] mx-auto px-6 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[640px]">
          <h1
            className={makeClass(
              className,
              "headline text-[clamp(40px,6vw,72px)] text-ink"
            )}
            {...props}
          />
          {subtitle && <div className="lede mt-[18px]">{subtitle}</div>}
        </div>
        {action}
      </div>
    </header>
  );
}
