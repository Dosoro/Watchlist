import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Load saved preference and apply theme on mount
  useEffect(() => {
    const html = document.documentElement;
    const saved = localStorage.getItem("theme");

    let shouldBeDark = false;

    if (saved) {
      shouldBeDark = saved === "dark";
    } else {
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // Apply theme immediately
    if (shouldBeDark) {
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      setIsDark(false);
    }
  }, []); // Run once on mount

  // Update DOM when isDark state changes
  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]); // Only depend on isDark

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
