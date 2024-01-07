"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-app-theme/use-theme";

export default function SetThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

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
