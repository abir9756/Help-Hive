"use client";

import { Moon, Sun } from "lucide-react";

import { applyTheme } from "@/lib/theme";

const baseButton =
  "grid size-8 place-items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export default function ThemeToggle() {
  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex shrink-0 items-center gap-0.5 rounded-full bg-toggle p-1 shadow-[inset_0_1px_2px_rgba(10,61,43,0.08)]"
    >
      <button
        type="button"
        onClick={() => applyTheme("light")}
        aria-label="Use light theme"
        title="Light mode"
        className={`${baseButton} bg-[#fdf2c9] text-[#d79a20] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:brightness-95 dark:bg-transparent dark:text-brand-muted dark:shadow-none dark:hover:bg-brand-soft/70 dark:hover:text-brand-ink`}
      >
        <Sun className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        aria-label="Use dark theme"
        title="Dark mode"
        className={`${baseButton} text-brand-muted hover:bg-brand-soft/70 hover:text-brand-ink dark:bg-brand-light dark:text-brand-deep dark:hover:bg-brand-light/85`}
      >
        <Moon className="size-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
