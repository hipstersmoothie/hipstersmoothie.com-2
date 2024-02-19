"use client";

import * as React from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { useMove } from "react-aria";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const clipPath =
  "M175.209 174.469C174.043 173.224 173.16 172.28 173.062 172.379C171.035 170.295 162.474 167.651 168.285 159.895C180.332 146.375 187.447 127.803 187.447 107.818C187.447 64.1548 152.496 28.6787 108.732 28.6787C64.968 28.6787 29.8282 64.2194 29.8282 107.883C29.8282 131.327 39.7744 151.978 55.7374 166.774C61.9686 172.55 54.038 178.366 51.4597 179.395C51.2153 179.196 48.946 181.65 46.7481 184.027C44.8647 186.064 43.0336 188.044 42.574 188.25C41.7059 188.639 40.2853 188.076 40.7513 186.467C40.7941 186.32 41.4608 185.684 42.3887 184.8C44.9283 182.38 49.4244 178.095 48.4384 176.84C29.4933 160.106 17.5421 135.607 17.5421 108.312C17.5421 62.7688 50.8131 25.0126 94.3291 18.1148C97.936 17.5431 101.892 17.2508 105.627 17.1162C106.596 16.8468 107.736 16.2294 108.166 14.1244C108.393 13.0133 108.437 11.4854 108.501 9.27287L108.507 9.0467C108.538 7.97218 110.683 7.9726 110.683 9.0467C110.683 9.53302 110.678 9.99719 110.674 10.4379C110.656 12.0712 110.642 13.3827 110.896 14.3077C112.17 16.9664 113.539 17.1162 113.539 17.1162C113.539 17.1162 124.886 18.2534 130.3 19.5729C170.2 29.2979 199.471 65.3367 199.471 108.31C199.471 110.274 199.41 112.225 199.289 114.158C199.289 115.81 199.834 116.448 200.602 117.347C200.761 117.534 200.93 117.731 201.106 117.952C201.982 119.051 205.276 119.959 207.532 120.581C208.809 120.933 209.754 121.194 209.738 121.345C210.359 122.106 210.261 123.212 209.521 123.244C208.416 123.292 206.672 122.737 205.026 122.214C203.498 121.727 202.056 121.268 201.292 121.345C199.782 121.497 198.376 122.609 198.192 123.704C195.296 140.165 187.945 155.299 177.392 167.651C176.706 168.453 176.21 169.151 175.801 170.295C175.657 171.536 176.803 172.601 178.136 173.838C179.041 174.679 180.032 175.599 180.763 176.709C181.574 177.941 180.006 179.242 178.931 178.26C177.731 177.163 176.338 175.675 175.209 174.469Z";

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
        className="bg-[#253246] absolute inset-0 z-[-1]"
        style={{
          backgroundSize: 20,
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ0AAACcCAYAAABleqlzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATkSURBVHgB7dq7SlxbGMDxfRmTEy8kKQJJCCERbLTUUsQHsNVX8DW01hfwCQTt9AG8YKmlVlYiipdGD17wMvusJY5Ejo4Bh71D+H1gnJDPn81iO678k6Io0qWlpVr43PbMR210dDS3Y6cVO0mYdG5uLu/u7n7b39+fJ0/M8fFxcnl5eZPnefrly5cnd46OjorNzc2brq6ujMNp5qRp+m8aTl8evvjdp0+f0uQVs7W1VQQj4XCazcOhC6/fxb8nr5h46uM353CaTTx0tfn5+WRwcLD+3CM0Ph5vb2/rWZalTU5zsbOzU7+5uUk4nJecPLynS9bW1rKPHz/m7e3t//uik5OT24WFheuzs7PiuZ39/f368vLy9cXFRcLhNHOmpqau7v7h/jfYfw4PDzvD6674ER6bXXt7e+3r6+ttL+3MzMy0cTi/48TXWfwj/JwtVlZWrra3t28bJzQsFYuLi9cDAwPXL+2Mj49fczi/48TX2f1COjIykv/48ePhZ3dYSsPjsBavVOzYadVOfJ3Hv2xsbNS+ffv25vPnzw9vBuPP576+vuz9+/fp7u5uEe7ycjt2XrszPT193ZLL4TBFeEP56stGzt/vtPRyON7XxM8cTrOJhy5LjCl5sng5HC736s8txMfjwcFBvXGin5r4b/eXhBzOi05LLodPT09bctnI+fudh8vhiYmJLF7chfd3HfFS7/6Cr/OpC8C407gAjJeBcSd8/ZuwknI4Lznx9d1vHOG0Jufn50U4jemHDx+yxin+9QJwcnIy+fnzZ3yMZh0dHVnYT+KjdXZ29iZ807hTcDgvOWG3SBtPut7e3lq4Oql9//49u68GivB+L36zq7GxsdvGfd7Xr1/barXa3U74WV2srq42durBSTmcZk78H4q7y+HwSGwbGhpq6+npycNpjgfx7uO5C8DGTmdn56879eHh4RqH08xp2eWwMpajHOb8sY5ymFO6oxzmKIc5ymFlLEc5zFEO27GjHLajHOZwlMOc6h3lsKlklMOc0h3lMEc5zFEOK2M5ymGOclgZy1EOc5TDHM6jUQ5zSneUwxzlMEc5rIzlKIc5ymE7dpTDdpTDHI5ymFO9oxw2lYxymFO6oxzmKIc5ymFlLEc5zFEOK2M5ymGOcpjDeTTKYU7pjnKYoxzmKIeVsRzlMEc5bMeOctiOcpjDUQ5zqneUw6aSUQ5zSneUwxzlMEc5rIzlKIc5ymFlLEc5zFEOcziPRjnMKd1RDnOUwxzlsDKWoxzmKIft2FEO21EOczjKYU71jnLYVDLKYU7pjnKYoxzmKIeVsRzlMEc5rIzlKIc5ymEO59EohzmlO8phjnKYoxxWxnKUwxzlsB07ymE7ymEORznMqd5RDptKRjnMKd1RDnNKdZTDHOUwRzmsjOUohznK4YdRxnKUw5w/1lEOc0p3lMMc5TBHOayM5SiHOcphO3aUw3aUwxyOcphTvaMcNpWMcphTuqMc5iiHOcphZSxHOcxRDitjOcphjnKYw3k0ymFO6Y5ymKMc5iiHlbEc5TBHOWzHjnLYjnKYw1EOc6p3lMOmklEOc0p3lMMc5TBHOayM5SiHOcphZSxHOcxRDnM4j0Y5zCndUQ5zlMMc5bAylqMc5iiH7dhRDttRDnM4z14OZ+Ekvg2n8FX3NfE0x88cTrMJh+78P08XHGl34Gf9AAAAAElFTkSuQmCC')",
          clipPath: `path('${clipPath}')`,
        }}
      />
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
            className="absolute w-[6px] h-0.5 rounded"
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
            className="absolute w-[6px] h-0.5 rounded"
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
