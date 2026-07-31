"use client";

import Image from "next/image";
import { motion } from "motion/react";

const images = [
  { src: "/images/hero-1.png", rotate: -8, x: 0, y: 0, delay: 0 },
  { src: "/images/hero-2.png", rotate: 4, x: 10, y: 6, delay: 0.6 },
  { src: "/images/hero-3.png", rotate: -3, x: -8, y: 12, delay: 1.2 },
];

export default function FloatingImageStack() {
  return (
    <span className="relative mx-3 inline-block h-[1.6em] w-[1.6em] -translate-y-[0.1em] align-middle">
      {images.map((img, i) => (
        <motion.span
          key={img.src}
          className="absolute inset-0 overflow-hidden rounded-xl shadow-lg"
          style={{
            rotate: img.rotate,
            x: img.x,
            y: img.y,
            zIndex: images.length - i,
          }}
          animate={{ y: [img.y, img.y - 10, img.y] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: img.delay,
          }}
        >
          <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
        </motion.span>
      ))}
    </span>
  );
}
