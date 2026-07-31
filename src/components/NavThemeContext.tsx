"use client";

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";

interface NavThemeContextValue {
  isDark: boolean;
  registerDark: (id: string, active: boolean) => void;
}

const NavThemeContext = createContext<NavThemeContextValue | null>(null);

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [darkIds, setDarkIds] = useState<Set<string>>(new Set());

  const registerDark = useCallback((id: string, active: boolean) => {
    setDarkIds((prev) => {
      const already = prev.has(id);
      if (active === already) return prev;
      const next = new Set(prev);
      if (active) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <NavThemeContext.Provider value={{ isDark: darkIds.size > 0, registerDark }}>
      {children}
    </NavThemeContext.Provider>
  );
}

export function useNavTheme() {
  const ctx = useContext(NavThemeContext);
  if (!ctx) throw new Error("useNavTheme must be used within NavThemeProvider");
  return ctx;
}

/** Attach to a section's ref to mark it as a "dark background" zone
 * whenever it's near the top of the viewport (under the fixed navbar). */
export function useDarkSection(id: string) {
  const { registerDark } = useNavTheme();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!el) {
        registerDark(id, false);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          registerDark(id, entry.isIntersecting);
        },
        { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
      );
      observer.observe(el);
      observerRef.current = observer;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  return ref;
}
