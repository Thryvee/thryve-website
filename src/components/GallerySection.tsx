"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import CircularGallery from "./CircularGallery";
import type { CircularGalleryItem, CircularGalleryHandle } from "./CircularGallery";
import { useDarkSection } from "./NavThemeContext";

const baseGalleryItems: CircularGalleryItem[] = [
  { image: "/images/1.jpg", text: "" },
  { image: "/images/2.webp", text: "" },
  { image: "/images/3.webp", text: "" },
  { image: "/images/4.webp", text: "" },
  { image: "/images/5.webp", text: "" },
  { image: "/images/6.jpg", text: "" },
  { image: "/images/7.jpg", text: "" },
  { image: "/images/8.jpg", text: "" },
  { image: "/images/9.jpg", text: "" },
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const AUTO_SPEED = 0.28; // px advanced per frame

export default function GallerySection() {
  const galleryItems = useMemo(() => shuffle(baseGalleryItems), []);
  const sectionRef = useRef<HTMLElement>(null);
  const darkRef = useDarkSection("gallery-section");
  const galleryRef = useRef<CircularGalleryHandle>(null);

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      darkRef(el);
    },
    [darkRef]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let playing = false;
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!playing) return;
      galleryRef.current?.advanceBy(AUTO_SPEED);
    };
    raf = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        playing = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={setRefs} className="relative h-screen w-full overflow-hidden bg-black">
      <CircularGallery
        ref={galleryRef}
        items={galleryItems}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        scrollEase={0.02}
      />
    </section>
  );
}
