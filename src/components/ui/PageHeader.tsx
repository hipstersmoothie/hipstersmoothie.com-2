import makeClass from "clsx";

export function PageHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <div className="bg-gray-200 p-5 md:py-16 md:px-24">
      <div className="max-w-screen-md mx-auto">
        <h1
          className={makeClass(className, "text-4xl md:text-6xl")}
          {...props}
        />
      </div>
    </div>
  );
}
