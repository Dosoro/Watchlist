import { useTheme } from "../hooks/useTheme.js";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function GlobalHeader() {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsDark(!isDark)}
        className="group rounded-lg bg-foreground p-3 shadow-card transition-all hover:scale-110 hover:shadow-lg active:scale-95"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative h-6 w-6">
          <IconSun
            className={`absolute inset-0 h-6 w-6 text-accent transition-all duration-500 ease-in-out ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-180 scale-50 opacity-0"
            }`}
          />
          <IconMoon
            className={`absolute inset-0 h-6 w-6 text-accent transition-all duration-500 ease-in-out ${
              isDark
                ? "-rotate-180 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
