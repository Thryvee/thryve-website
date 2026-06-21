"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Restore dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("thryve-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let lenis: any;
    let raf: number;

    async function init() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 1.4,
        touchMultiplier: 2.5,
        infinite: false,
      });

      (window as any).__lenis = lenis;

      function tick(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }
    init();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
