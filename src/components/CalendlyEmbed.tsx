"use client";

import { useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/thhryve-info/30min";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function CalendlyEmbed() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;

    const lockIframeHeight = () => {
      const iframe = innerRef.current?.querySelector("iframe");
      if (iframe) {
        iframe.style.setProperty("height", "100%", "important");
        iframe.style.setProperty("min-height", "0", "important");
      }
    };

    const initWidget = () => {
      if (cancelled || !innerRef.current || !window.Calendly) return;
      innerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: innerRef.current,
      });

      observer = new MutationObserver(lockIframeHeight);
      observer.observe(innerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });
      lockIframeHeight();
    };

    if (window.Calendly) {
      initWidget();
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      const script = existingScript ?? document.createElement("script");
      if (!existingScript) {
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", initWidget);
      return () => {
        cancelled = true;
        script.removeEventListener("load", initWidget);
        observer?.disconnect();
      };
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: 1100, overflow: "hidden" }}>
      <div ref={innerRef} style={{ height: "100%", width: "100%", overflowY: "auto" }} />
    </div>
  );
}
