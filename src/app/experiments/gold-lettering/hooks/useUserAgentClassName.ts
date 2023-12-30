"use client";

import { useEffect, useState } from "react";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<
    "safari-mobile" | "chrome" | "safari"
  >();

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") > -1 && ua.indexOf("chrome/") === -1) {
      if (ua.indexOf("mobile/") > -1) {
        document.body.classList.add("safari-mobile");
        setDeviceType("safari-mobile");
      } else {
        document.body.classList.add("safari");
        setDeviceType("safari");
      }
    } else {
      document.body.classList.remove("safari");
      setDeviceType("chrome");
    }
  }, []);

  return deviceType;
}
