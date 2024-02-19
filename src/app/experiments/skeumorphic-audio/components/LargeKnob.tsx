"use client";

import * as React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { useMove } from "react-aria";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const clipPath =
  "M201.674 107.865C201.674 58.3119 163.017 17.7875 114.215 14.8034C113.758 14.688 111.149 13.5621 110.487 10.769C109.906 8.3186 109.856 5.6374 109.856 3.16621C109.856 1.61401 107.054 1.6134 107.009 3.16621L106.999 3.49306C106.907 6.69037 106.843 8.89842 106.512 10.504C105.908 13.4407 104.339 14.374 102.962 14.7853C101.924 14.8454 100.888 14.9225 99.8536 15.017C50.9887 19.48 15.1985 59.2648 15.1985 107.865C15.1985 132.861 22.309 152.706 41.0474 172.301C41.6477 172.929 42.4386 173.73 42.6036 173.89C44.2376 175.52 45.9547 177.073 47.6983 178.577C49.6052 180.945 41.1056 188.218 39.7131 189.611C39.1594 190.186 37.7582 191.116 37.54 191.931C36.9492 194.142 38.8835 194.878 40.0479 194.326C40.6643 194.033 43.0919 191.28 45.5887 188.448C48.5021 185.144 51.8453 181.998 51.8453 181.998C51.8453 181.998 62.8419 171.007 58.4415 165.768C58.0989 165.36 57.3211 164.631 57.3211 164.631C57.3211 164.631 55.3677 162.811 54.4164 161.874C40.5962 148.051 32.0487 128.956 32.0487 107.865C32.0487 65.6773 66.2487 31.4774 108.436 31.4774C150.624 31.4774 184.824 65.6773 184.824 107.865C184.824 123.84 179.92 138.67 171.536 150.931C169.792 153.183 167.96 155.355 166.044 157.439C159.324 166.126 165.688 170.368 170.007 173.246C171.112 173.983 172.668 175.241 172.668 175.241C172.668 175.241 174.057 176.455 175.703 178.242C177.489 180.028 179.11 181.965 180.964 183.687C182.485 185.099 184.75 183.279 183.61 181.516C182.583 179.928 181.181 178.605 179.9 177.396C179.54 177.057 179.18 176.746 178.837 176.45C177.382 175.194 176.223 174.194 176.62 172.328C176.782 171.565 177.481 170.525 177.481 170.525C185.086 161.364 194.425 147.595 198.875 130.632C199.249 129.206 199.631 127.603 199.762 126.962C200.008 125.718 201.661 124.491 203.403 124.365C204.285 124.302 205.931 124.871 207.674 125.475C209.551 126.125 211.542 126.814 212.815 126.794C213.668 126.78 213.815 125.519 213.124 124.631C212.94 124.394 212.068 124.132 210.609 123.689C208.111 122.932 204.449 121.884 202.734 119.777C201.878 118.726 201.271 117.98 201.322 116.093C201.571 113.348 201.674 110.616 201.674 107.865Z";

/**
 * Offset of the start angle (in degrees) of the knob. 0 is the top of the circle.
 */
const DEFAULT_ANGLE_OFFSET = -45;

/**
 * Angle of the range in degrees.
 */
const DEFAULT_ANGLE_RANGE = 270;

interface KnobProps {
  defaultValue?: number;
  value?: number;
  min: number;
  max: number;
  onValueChange?: (value: number) => void;
}

/** A compact slider that looks like a knob. */
export function LargeKnob({
  min,
  max,
  value: valueProp,
  defaultValue,
  onValueChange: onValueChangeProp,
}: KnobProps): React.ReactElement {
  const [value, onValueChange] = useControllableState({
    prop: valueProp as number,
    defaultProp: defaultValue,
    onChange: onValueChangeProp,
  });
  const fraction = ((value || 0) - min) / (max - min);

  const { moveProps } = useMove({
    onMove: ({ deltaX }) => {
      const newFraction = clamp(fraction + deltaX / 100, 0, 1);
      const newValue = newFraction * (max - min) + min;
      onValueChange(clamp(newValue, min, max));
    },
    onMoveEnd: () => {
      onValueChange(value);
    },
  });

  const angle = DEFAULT_ANGLE_OFFSET + DEFAULT_ANGLE_RANGE * fraction;
  const ticks = new Array(90).fill(0);
  const visible = Math.floor(fraction * ticks.length);

  return (
    <div className="relative p-10 z-0">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          filter:
            "drop-shadow(white 0px 0px 2px) drop-shadow(white 0px 0px 2px)",
        }}
      >
        <div
          className="bg-[#253246] h-full w-full"
          style={{
            backgroundSize: 20,
            backgroundImage:
              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACcCAYAAABleqlzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATkSURBVHgB7dq7SlxbGMDxfRmTEy8kKQJJCCERbLTUUsQHsNVX8DW01hfwCQTt9AG8YKmlVlYiipdGD17wMvusJY5Ejo4Bh71D+H1gnJDPn81iO678k6Io0qWlpVr43PbMR210dDS3Y6cVO0mYdG5uLu/u7n7b39+fJ0/M8fFxcnl5eZPnefrly5cnd46OjorNzc2brq6ujMNp5qRp+m8aTl8evvjdp0+f0uQVs7W1VQQj4XCazcOhC6/fxb8nr5h46uM353CaTTx0tfn5+WRwcLD+3CM0Ph5vb2/rWZalTU5zsbOzU7+5uUk4nJecPLynS9bW1rKPHz/m7e3t//uik5OT24WFheuzs7PiuZ39/f368vLy9cXFRcLhNHOmpqau7v7h/jfYfw4PDzvD6674ER6bXXt7e+3r6+ttL+3MzMy0cTi/48TXWfwj/JwtVlZWrra3t28bJzQsFYuLi9cDAwPXL+2Mj49fczi/48TX2f1COjIykv/48ePhZ3dYSsPjsBavVOzYadVOfJ3Hv2xsbNS+ffv25vPnzw9vBuPP576+vuz9+/fp7u5uEe7ycjt2XrszPT193ZLL4TBFeEP56stGzt/vtPRyON7XxM8cTrOJhy5LjCl5sng5HC736s8txMfjwcFBvXGin5r4b/eXhBzOi05LLodPT09bctnI+fudh8vhiYmJLF7chfd3HfFS7/6Cr/OpC8C407gAjJeBcSd8/ZuwknI4Lznx9d1vHOG0Jufn50U4jemHDx+yxin+9QJwcnIy+fnzZ3yMZh0dHVnYT+KjdXZ29iZ807hTcDgvOWG3SBtPut7e3lq4Oql9//49u68GivB+L36zq7GxsdvGfd7Xr1/barXa3U74WV2srq42durBSTmcZk78H4q7y+HwSGwbGhpq6+npycNpjgfx7uO5C8DGTmdn56879eHh4RqH08xp2eWwMpajHOb8sY5ymFO6oxzmKIc5ymFlLEc5zFEO27GjHLajHOZwlMOc6h3lsKlklMOc0h3lMEc5zFEOK2M5ymGOclgZy1EOc5TDHM6jUQ5zSneUwxzlMEc5rIzlKIc5ymE7dpTDdpTDHI5ymFO9oxw2lYxymFO6oxzmKIc5ymFlLEc5zFEOK2M5ymGOcpjDeTTKYU7pjnKYoxzmKIeVsRzlMEc5bMeOctiOcpjDUQ5zqneUw6aSUQ5zSneUwxzlMEc5rIzlKIc5ymFlLEc5zFEOcziPRjnMKd1RDnOUwxzlsDKWoxzmKIft2FEO21EOczjKYU71jnLYVDLKYU7pjnKYoxzmKIeVsRzlMEc5rIzlKIc5ymEO59EohzmlO8phjnKYoxxWxnKUwxzlsB07ymE7ymEORznMqd5RDptKRjnMKd1RDnNKdZTDHOUwRzmsjOUohznK4YdRxnKUw5w/1lEOc0p3lMMc5TBHOayM5SiHOcphO3aUw3aUwxyOcphTvaMcNpWMcphTuqMc5iiHOcphZSxHOcxRDitjOcphjnKYw3k0ymFO6Y5ymKMc5iiHlbEc5TBHOWzHjnLYjnKYw1EOc6p3lMOmklEOc0p3lMMc5TBHOayM5SiHOcphZSxHOcxRDnM4j0Y5zCndUQ5zlMMc5bAylqMc5iiH7dhRDttRDnM4z14OZ+Ekvg2n8FX3NfE0x88cTrMJh+78P08XHGl34Gf9AAAAAElFTkSuQmCC')",
            clipPath: `path('${clipPath}')`,
          }}
        />
      </div>
      {ticks.map((_, i) => {
        if (i / ticks.length > fraction) {
          return null;
        }

        const indexFromEnd = visible - i;
        const range = 20;

        if (indexFromEnd > range) {
          return null;
        }

        const intensity = (range - indexFromEnd) / range;
        const color = i / ticks.length > 0.8 ? "#FB4767" : "#F7FC90";

        return (
          <div
            key={i}
            className="absolute w-2 h-0.5 rounded"
            data-from-end={indexFromEnd}
            style={{
              boxShadow: `0px 0px ${5 * intensity}px ${
                2 * intensity
              }px ${color}`,
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              transform: `translate(-50%, -50%) rotate(${
                (i / ticks.length) * 272 - 48
              }deg) translateX(-85px)`,
            }}
          />
        );
      })}
      {ticks.map((_, i) => {
        if (i / ticks.length > fraction) {
          return null;
        }

        return (
          <div
            key={i}
            className="absolute w-2 h-0.5 rounded"
            data-from-end={visible - i}
            style={{
              background: "linear-gradient(0,#FAFA9A,#FBFB89,#FCC735)",
              backgroundSize: "100% 1000%",
              backgroundPosition: `center ${(i / ticks.length) * 100}%`,
              backgroundRepeat: "no-repeat",
              left: "50%",
              top: "50%",
              transformOrigin: "center",
              transform: `translate(-50%, -50%) rotate(${
                (i / ticks.length) * 272 - 48
              }deg) translateX(-85px)`,
            }}
          />
        );
      })}
      <button
        {...moveProps}
        role="slider"
        className="rounded-full"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        style={{
          boxShadow:
            "0px 20px 30px 0px rgba(0, 0, 0, 0.1), 0px 20px 25px 0px #A1B5CE4f",
        }}
      >
        <div className="w-fit p-2 rounded-full bg-[linear-gradient(0,#E3EEFA_80%,#EBF2FA)] flex items-center justify-center">
          <div
            className="h-[120px] w-[120px] rounded-full flex items-center justify-center"
            style={{
              boxShadow:
                "inset 0px 0px 2px 0px rgba(255, 255, 255, 1), inset 0px -8px 15px 0px rgba(255, 255, 255, 0.25), inset 0px 2px 8px 0px  oklch(0.92 0.02 253.46 / 1)",
            }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                transformOrigin: "center",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div
                className="h-3 w-3 bg-[#B9CFE7] rounded-full absolute top-1/2 left-1.5"
                style={{
                  boxShadow:
                    "0px 1px 0px 0.5px rgba(255, 255, 255, 0.5), inset 0px 1px 4px 0px rgba(0, 0, 0, 0.1)",
                  transformOrigin: "center",
                  transform: `translateY(-50%) rotate(${-angle}deg) `,
                }}
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
