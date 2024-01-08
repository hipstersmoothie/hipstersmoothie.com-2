import makeClass from "clsx";

export function PageHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <div
      className="
        p-5 md:py-16 md:px-24
      bg-mauve-4  dark:bg-mauvedark-3 
      text-mauve-12 dark:text-mauvedark-12
      "
    >
      <div className="max-w-screen-md mx-auto">
        <h1
          className={makeClass(className, "text-4xl md:text-6xl")}
          {...props}
        />
      </div>
    </div>
  );
}
