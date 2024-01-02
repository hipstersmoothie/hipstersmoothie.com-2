import makeClass from "clsx";

import styles from "./OutlinedBox.module.css";
import rootStyles from "../../cardstock.module.css";

interface OutlinedBoxProps extends React.ComponentProps<"div"> {}

export function OutlinedBox({
  children,
  className,
  ...props
}: OutlinedBoxProps) {
  return (
    <div
      className={makeClass(className, styles.box, "relative border-8")}
      {...props}
    >
      <div aria-hidden={true}>{children}</div>
      <div className={styles.root}>
        <div className={styles.glimmerGroup}>
          <div className={styles.glimmerLayer4} />
          <div className={styles.glimmerLayer3} />
          <div className={styles.glimmerLayer2} />
        </div>
      </div>
      <div
        className={makeClass(
          rootStyles.cardstock,
          "absolute inset-0 h-full w-full z-10"
        )}
      >
        {children}
      </div>
    </div>
  );
}
