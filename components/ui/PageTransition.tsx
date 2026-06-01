"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"idle" | "in" | "out">("idle");
  const [display, setDisplay] = useState(children);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the wipe animation on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Defer all setState calls so React compiler doesn't flag synchronous updates
    const t0 = setTimeout(() => setStage("in"), 0);
    const t1 = setTimeout(() => {
      setDisplay(children);
      setStage("out");
    }, 400);
    const t2 = setTimeout(() => setStage("idle"), 900);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return (
    <>
      {/* Wipe overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99997,
          background: "var(--text)",
          transform:
            stage === "idle"
              ? "scaleX(0)"
              : stage === "in"
                ? "scaleX(1)"
                : "scaleX(0)",
          transformOrigin: stage === "in" ? "left" : "right",
          transition:
            stage === "idle"
              ? "none"
              : "transform 0.4s cubic-bezier(0.87,0,0.13,1)",
          pointerEvents: stage !== "idle" ? "all" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 500,
            color: "rgba(250,250,250,0.15)",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            opacity: stage === "in" ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          Thryve
        </div>
      </div>
      <div
        style={{
          opacity: stage === "in" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {display}
      </div>
    </>
  );
}
