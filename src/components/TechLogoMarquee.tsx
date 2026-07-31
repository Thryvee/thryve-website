import Image from "next/image";

const logos = ["/images/logo-1.png", "/images/logo-2.png", "/images/logo-3.webp", "/images/logo-4.webp"];

export default function TechLogoMarquee() {
  const items = [...logos, ...logos];

  return (
    <div className="relative h-64 w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex w-max items-center gap-4"
          style={{ animation: "tech-marquee-scroll 9s linear infinite" }}
        >
          {items.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white p-4 shadow-sm md:h-28 md:w-28"
            >
              <Image src={src} alt="" fill sizes="112px" className="object-contain p-4" />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24"
        style={{ background: "linear-gradient(to right, #ffffff, #ffffff00)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24"
        style={{ background: "linear-gradient(to left, #ffffff, #ffffff00)" }}
      />

      <style>{`
        @keyframes tech-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
