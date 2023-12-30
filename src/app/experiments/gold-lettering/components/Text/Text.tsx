"use client";

import { mergeProps } from "react-aria";
import makeClass from "clsx";

import styles from "./Text.module.css";

type Allowed = "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextProps<C extends Allowed> = React.ComponentProps<C> & {
  as?: C;
};

export function Text({
  as: Component = "div",
  children,
  ...props
}: TextProps<Allowed>) {
  return (
    <Component
      data-text={children}
      {...mergeProps(props, {
        className: makeClass(styles.root, styles[Component]),
      })}
    >
      <span>{children}</span>
      <div className={styles.glimmerGroup}>
        <span>{children}</span>
        <div className={styles.glimmerLayer4}>{children}</div>
        <div className={styles.glimmerLayer3}>{children}</div>
        <div className={styles.glimmerLayer2}>{children}</div>
      </div>
    </Component>
  );
}
