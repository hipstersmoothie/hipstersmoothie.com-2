"use client";

import { Noto_Serif } from "next/font/google";

import { useDeviceAnimation } from "../hooks/usePointerPosition";
import { useDeviceType } from "../hooks/useUserAgentClassName";

const noto = Noto_Serif({ subsets: ["latin"] });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { askPermission } = useDeviceAnimation();
  const deviceType = useDeviceType();

  return (
    <>
      {deviceType === "safari-mobile" && (
        <button className="absolute top-4 right-4" onClick={askPermission}>
          Enable Shimmer
        </button>
      )}
      <div className={noto.className}>{children}</div>
    </>
  );
}
