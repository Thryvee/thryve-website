"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TrailVisibilityContextValue {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const TrailVisibilityContext = createContext<TrailVisibilityContextValue | null>(null);

export function TrailVisibilityProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <TrailVisibilityContext.Provider value={{ hidden, setHidden }}>
      {children}
    </TrailVisibilityContext.Provider>
  );
}

export function useTrailVisibility() {
  const ctx = useContext(TrailVisibilityContext);
  if (!ctx) throw new Error("useTrailVisibility must be used within TrailVisibilityProvider");
  return ctx;
}
