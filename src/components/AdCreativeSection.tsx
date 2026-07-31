"use client";

import Image from "next/image";
import CardSwap, { Card } from "./CardSwap";

const pairs = [
  { image: "/images/1.jpg", stat: "+340%", label: "Click-through rate" },
  { image: "/images/2.webp", stat: "+215%", label: "Add-to-cart rate" },
  { image: "/images/3.webp", stat: "3.2x", label: "Return on ad spend" },
  { image: "/images/4.webp", stat: "-42%", label: "Cost per acquisition" },
  { image: "/images/5.webp", stat: "+180%", label: "Conversion rate" },
  { image: "/images/6.jpg", stat: "4.6x", label: "Revenue growth" },
  { image: "/images/7.jpg", stat: "+265%", label: "Engagement rate" },
  { image: "/images/8.jpg", stat: "-38%", label: "Cost per click" },
  { image: "/images/9.jpg", stat: "+310%", label: "Repeat purchase rate" },
];

export default function AdCreativeSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 md:px-16">
      <h2 className="font-display mx-auto max-w-3xl text-center text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
        Give Your Ad Creative the Premium Touch it Deserves
      </h2>

      <div className="relative mt-24 flex h-[420px] w-full max-w-md items-center justify-center md:h-[520px]">
        <CardSwap width={340} height={430} cardDistance={40} verticalDistance={50} delay={2200} pauseOnHover>
          {pairs.flatMap((pair, i) => [
            <Card key={`img-${i}`} customClass="overflow-hidden !bg-zinc-900">
              <div className="relative h-full w-full">
                <Image src={pair.image} alt="" fill sizes="340px" className="object-cover" />
              </div>
            </Card>,
            <Card key={`result-${i}`} customClass="flex flex-col items-center justify-center gap-3 !bg-white px-8">
              <span className="font-display text-5xl text-black">{pair.stat}</span>
              <span className="text-center text-sm tracking-wide text-black/60 uppercase">{pair.label}</span>
            </Card>,
          ])}
        </CardSwap>
      </div>
    </section>
  );
}
