"use client";

import { ReactNode } from "react";
import { useTrailVisibility } from "./TrailVisibilityContext";

export default function TrailLayer({ children }: { children: ReactNode }) {
  const { hidden } = useTrailVisibility();
  return (
    <div
      className="absolute inset-0 z-20 transition-opacity duration-300"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}
    >
      {children}
    </div>
  );
}
