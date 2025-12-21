import { useTheme } from "../hooks/useTheme.js"; // Theme hook
import { IconSun, IconMoon } from "@tabler/icons-react"; // Icons

export function GlobalHeader() {
  const { isDark, setIsDark } = useTheme(); // Get theme state

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsDark(!isDark)}
        className="rounded-lg bg-foreground p-3 shadow-card transition hover:shadow-lg"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <IconSun className="h-6 w-6 text-accent" />
        ) : (
          <IconMoon className="h-6 w-6 text-accent" />
        )}
      </button>
    </div>
  );
}
