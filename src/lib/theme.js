export const THEME_STORAGE_KEY = "helphive-theme";

export function applyTheme(theme) {
  if (typeof document === "undefined") return;

  const isDark = theme === "dark";
  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";

  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    // Storage can be unavailable (private mode); the in-memory class still applies.
  }
}
