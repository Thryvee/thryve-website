"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    window.lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenisInstance = undefined;
    };
  }, []);

  return <>{children}</>;
}
