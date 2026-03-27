"use client";
import { useEffect } from "react";

const STORAGE_KEY = "thryve_visited";

/**
 * Sets a localStorage flag on first visit.
 * On subsequent visits, patches the hero subheadline text via the DOM
 * so SSR doesn't flash the wrong text.
 */
export default function ReturnVisitor() {
  useEffect(() => {
    const isReturn = localStorage.getItem(STORAGE_KEY) === "1";
    if (isReturn) {
      // Find the subheadline element and update its text
      const sub = document.getElementById("hero-sub");
      if (sub) {
        sub.textContent = "Welcome back. The audit is still free.";
      }
    } else {
      localStorage.setItem(STORAGE_KEY, "1");
    }
  }, []);

  return null;
}
