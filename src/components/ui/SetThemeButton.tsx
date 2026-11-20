"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-app-theme/use-theme";

export default function SetThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light appearance" : "Switch to dark appearance"}
      onClick={toggleTheme}
      className="
        inline-flex items-center justify-center w-8 h-8 rounded-full
        text-ink border border-hair hover:bg-ground-alt transition-colors
      "
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
