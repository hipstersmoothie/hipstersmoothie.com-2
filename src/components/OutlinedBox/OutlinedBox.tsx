import makeClass from "clsx";

interface OutlinedBoxProps extends React.ComponentProps<"div"> {}

export function OutlinedBox({
  children,
  className,
  ...props
}: OutlinedBoxProps) {
  return (
    <div
      className={makeClass(className, "relative border-8 border-yellow-600")}
      {...props}
    >
      {children}
    </div>
  );
}
