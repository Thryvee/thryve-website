"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    window.lenisInstance?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      allowNestedScroll: true,
    });

    window.lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Lenis caches the scrollable height on init. Sections with async
    // content (video/embed players, webfonts, canvas-sized text) can grow
    // the page after that, leaving Lenis clamped to a stale, shorter
    // height — which reads as scroll "getting stuck" until a hard reload
    // re-measures. Re-measure on the signals most likely to change layout.
    const resize = () => lenis.resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.body);

    window.addEventListener("resize", resize);
    document.fonts?.ready?.then(resize).catch(() => {});

    const imageListeners: Array<() => void> = [];
    document.querySelectorAll("img").forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", resize, { once: true });
      imageListeners.push(() => img.removeEventListener("load", resize));
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      imageListeners.forEach((remove) => remove());
      lenis.destroy();
      window.lenisInstance = undefined;
    };
  }, []);

  return (
    <>
      <ScrollToTopOnRouteChange />
      {children}
    </>
  );
}
