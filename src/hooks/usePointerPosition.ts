"use client";

import { useEffect } from "react";

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Attaches CSS variables to the document root element that represent the
 * pointer position.  On mobile devices, the device orientation is used to control the pointer
 * position.
 *
 * The CSS variables are:
 *
 *  --pointer-x: the x position of the pointer in pixels
 * --pointer-y: the y position of the pointer in pixels
 * --ratio-x: the x position of the pointer as a ratio of the viewport width
 * --ratio-y: the y position of the pointer as a ratio of the viewport height
 */
export function useDeviceAnimation() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, width, height, top } =
        document.body.getBoundingClientRect();
      const x = e.clientX - left;
      const pointerX = x / width;
      const y = e.clientY - top;
      const pointerY = y / height;

      document.documentElement.style.setProperty("--ratio-x", `${pointerX}`);
      document.documentElement.style.setProperty("--ratio-y", `${pointerY}`);
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${pointerX * 100 * 2}%`
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${pointerY * 100}%`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function askPermission() {
    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }

    let startPoint: { gamma?: number; beta?: number } = {
      gamma: undefined,
      beta: undefined,
    };

    function handleOrientation(event: DeviceOrientationEvent) {
      if (!event.beta || !event.gamma) return;

      let { beta, gamma } = startPoint;

      if (beta === undefined) {
        beta = event.beta;
        startPoint.beta = beta;
      }

      if (gamma === undefined) {
        gamma = event.gamma;
        startPoint.gamma = gamma;
      }

      const halfHeight = window.innerHeight / 2;
      const halfWidth = window.innerWidth / 2;
      const x = event.gamma - gamma;
      const y = event.beta - beta;
      const newX = clamp(
        -0.8,
        0.8,
        x /
          // make this number larger to reduce the sensitivity
          25 -
          0.1
      );
      const newY = clamp(-0.75, 0.75, y / 30 + 0.5);

      // convert to position in viewport
      const newXpx = halfWidth - newX * halfWidth;
      const newYpx = halfHeight - newY * halfHeight;
      const pointerX = newXpx / window.innerWidth;
      const pointerY = newYpx / window.innerHeight;

      document.documentElement.style.setProperty("--ratio-x", `${pointerX}`);
      document.documentElement.style.setProperty("--ratio-y", `${pointerY}`);
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${pointerX * 100}%`
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${pointerY * 100}%`
      );
    }

    window.addEventListener("deviceorientation", handleOrientation);
  }

  return { askPermission };
}
