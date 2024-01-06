"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";

export default function SetThemeButton() {
  const [theme, setTheme] = useState(global.window?.__theme || "light");
  const isDark = theme === "dark";

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-9 w-9 p-2.5"
      onClick={toggleTheme}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
