import { mergeProps } from "react-aria";
import makeClass from "clsx";

import styles from "./Text.module.css";
import { useCallback, useEffect, useRef, useState } from "react";

type Allowed = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextProps<C extends Allowed> = React.ComponentProps<C> & {
  as?: C;
};

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

export function Text({
  as: Component = "span",
  children,
  ...props
}: TextProps<Allowed>) {
  const [angle, setAngle] = useState(0);
  const updateAngle = useCallback((point: { x: number; y: number }) => {
    if (!elRef.current) return;

    const elRect = elRef.current.getBoundingClientRect();

    // calculate anygle between center of elRect and pointerX, pointerY
    const elCenterX = elRect.left + elRect.width / 2;
    const elCenterY = elRect.top + elRect.height / 2;

    const angle =
      (Math.atan2(point.y - elCenterY, point.x - elCenterX) * 180) / Math.PI;

    setAngle(angle);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, width, height, top } =
        document.body.getBoundingClientRect();
      const x = e.clientX - left;
      const pointerX = x / width;
      const y = e.clientY - top;
      const pointerY = y / height;

      document.documentElement.style.setProperty(
        "--pointer-x",
        `${pointerX * 100}%`
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${pointerY * 100}%`
      );

      updateAngle({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updateAngle]);

  const [orientation, setOrientation] = useState<
    Pick<DeviceOrientationEvent, "alpha" | "beta" | "gamma">
  >({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const elRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  function askPermission() {
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      setOrientation(event);
      if (!dotRef.current) return;
      if (!event.beta || !event.gamma) return;

      const halfHeight = window.innerHeight / 2;
      const halfWidth = window.innerWidth / 2;

      const x = event.gamma;
      const y = event.beta;
      const newX = clamp(-0.8, 0.8, (x - 10) / 25);
      const newY = clamp(-0.75, 0.75, (y - 25) / 30);

      // convert to position in viewport
      const newXpx = halfWidth - newX * halfWidth;
      const newYpx = halfHeight - newY * halfHeight;

      dotRef.current.style.transform = `translate(${newXpx}px, ${newYpx}px)`;

      const pointerX = newXpx / window.innerWidth;
      const pointerY = newYpx / window.innerHeight;

      document.documentElement.style.setProperty(
        "--pointer-x",
        `${pointerX * 100}%`
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${pointerY * 100}%`
      );

      updateAngle({ x: newXpx, y: newYpx });
    }

    window.addEventListener("deviceorientation", handleOrientation);
  }

  return (
    <>
      <button onClick={askPermission}>Ask</button>
      <p>{orientation.alpha}</p>
      <p>{orientation.beta}</p>
      <p>{orientation.gamma}</p>
      <p>{angle}</p>
      <Component
        ref={elRef}
        data-text={children}
        {...mergeProps(props, {
          className: makeClass(styles.root, styles[Component]),
          style: {
            ...props.style,
            "--angle": `${angle}deg`,
          },
        })}
      >
        <span>{children}</span>
      </Component>
      <svg>
        <filter id="wavy2">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed="1"
          />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
      <div className="h-2 w-2 bg-red-500 absolute top-0 left-0" ref={dotRef} />
    </>
  );
}
