"use client";

// Theme selector (system / light / dark) stored in a cookie and applied to <html data-theme="...">.
// AI disclosure: assisted by GPT-5 Pro.
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "@/lib/cookies-client";

type Theme = "system" | "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (getCookie("theme") as Theme) || "system");

  useEffect(() => {
    // Apply to <html data-theme="...">
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // Persist in cookie
    setCookie("theme", theme);
  }, [theme]);

  return (
    <label aria-label="Colour theme">
      <span className="sr-only">Theme</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        aria-describedby="theme-help"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <span id="theme-help" className="sr-only">Choose system, light, or dark appearance.</span>
    </label>
  );
}
