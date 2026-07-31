const brands = [
  "Katharina Lou",
  "Maem Disko",
  "Itadaki",
  "Fia Martinii",
  "Five By Flynn",
  "Maison Essentiele",
  "My Friends Are Yours",
  "Dal 1992",
  "Sunny's Slow Made Goods",
  "By Neil Vernon",
  "Karameleon",
  "Aaizel",
  "Youkhana",
  "Shhorn",
  "Remuse",
  "Pocket Money",
  "Observe",
];

export default function TrustedBySection() {
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="w-full overflow-hidden bg-white py-16">
      <p className="mb-10 text-center text-sm text-zinc-500">Audit Researched For</p>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max items-center gap-16"
          style={{ animation: "marquee-scroll 28s linear infinite" }}
        >
          {marqueeItems.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display whitespace-nowrap text-zinc-400"
              style={{ fontSize: "22px" }}
            >
              {brand}
            </span>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #ffffff, #ffffff00)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #ffffff, #ffffff00)" }}
        />
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
