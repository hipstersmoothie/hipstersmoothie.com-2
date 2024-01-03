"use client";

import makeClass from "clsx";
import { DM_Serif_Display } from "next/font/google";
import { useSpring, animated, config } from "@react-spring/web";

import styles from "./layering-gradients.module.css";
import { Link, Paragraph } from "../../../components/ui/typography";
import { useRef } from "react";

const font = DM_Serif_Display({ weight: ["400"], subsets: ["latin"] });

const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));
const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

function BusinessCard() {
  const [props, api] = useSpring(() => ({
    from: { rotateX: 0, rotateY: 0 },
    to: { rotateX: 90, rotateY: 90 },
  }));
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect(); // get element's current size/position
    const absolute = {
      x: e.clientX - rect.left, // get mouse position from left
      y: e.clientY - rect.top, // get mouse position from right
    };
    const percent = {
      x: clamp(round((100 / rect.width) * absolute.x)),
      y: clamp(round((100 / rect.height) * absolute.y)),
    };
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    api.start({
      rotateY: round(-(center.x / 3.5)),
      rotateX: round(center.y / 2),
    });
  };

  const onPointerLeave = () => api.start({ rotateX: 0, rotateY: 0 });

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <animated.div
        style={props}
        className={makeClass(
          styles.example1,
          font.className,
          "aspect-video",
          "flex items-center justify-center"
        )}
      >
        <div className="flex flex-col items-center">
          <div className="h-[1px] w-8 bg-gray-800" />
          <div className="text-6xl mt-12 mb-4">eternity</div>
          <div className="uppercase mb-6 text-sm" style={{ letterSpacing: 2 }}>
            creative shop
          </div>
          <div className="h-[1px] w-8 bg-gray-800" />
        </div>
      </animated.div>
    </div>
  );
}

export default function LayeringGradients() {
  return (
    <>
      <div className="max-w-screen-sm mx-auto p-6">
        <Paragraph>
          An implementation of{" "}
          <Link href="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Colorful-gradient-business-card-template-830x553.jpg?auto=format&q=60&fit=max&w=930">
            this business card
          </Link>
          .
        </Paragraph>
        <div className="grid grid-cols-1">
          <BusinessCard />
        </div>
      </div>
    </>
  );
}
