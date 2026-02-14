"use client";

import { Row, ToggleButton, useTheme } from "@once-ui-system/core";
import type React from "react";
import { useEffect, useState } from "react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  const animateThemeTransition = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 560);
  };

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  useEffect(() => {
    if (theme === "system") {
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
      return;
    }

    setCurrentTheme(theme);
  }, [theme]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => {
        animateThemeTransition();
        setTheme(nextTheme);
      }}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
