import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.js";

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;

    // Check if browser supports View Transitions API
    const updateTheme = () => {
      if (isDark) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    // Use View Transitions API if available for smooth transitions
    if (document.startViewTransition) {
      document.startViewTransition(() => updateTheme());
    } else {
      // Fallback for browsers without View Transitions API
      updateTheme();
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
