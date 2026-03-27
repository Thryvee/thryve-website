"use client";
import { useEffect } from "react";

/**
 * Handles two things on mount:
 * 1. Restores saved theme from localStorage.
 * 2. If no saved preference, auto-applies dark theme after 8pm / before 7am local time.
 */
export default function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem("thryve-theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }
    const h = new Date().getHours();
    if (h >= 20 || h < 7) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  return null;
}
