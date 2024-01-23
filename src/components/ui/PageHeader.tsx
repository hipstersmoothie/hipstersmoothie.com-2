import makeClass from "clsx";

export function PageHeader({
  className,
  subtitle,
  ...props
}: React.ComponentPropsWithoutRef<"h1"> & {
  subtitle?: React.ReactNode;
}) {
  return (
    <div
      className="
        p-5 md:py-12 md:px-24
      bg-mauve-4  dark:bg-mauvedark-3 
      text-mauve-12 dark:text-mauvedark-12
      "
    >
      <div className="max-w-screen-md mx-auto flex flex-col gap-4 md:gap-6">
        <h1
          className={makeClass(className, "text-4xl md:text-6xl")}
          {...props}
        />

        {subtitle && (
          <div className="md:text-xl text-mauve-11 dark:text-mauvedark-11">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
