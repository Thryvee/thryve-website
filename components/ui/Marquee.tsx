"use client";

interface Props {
  items: string[];
  direction?: "left" | "right";
  speed?: string;
}

export default function Marquee({
  items,
  direction = "left",
  speed = "20s",
}: Props) {
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", display: "flex" }}>
      <div
        className={direction === "left" ? "marquee-l" : "marquee-r"}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animationDuration: speed,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              padding: "0 32px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(16px, 2vw, 22px)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            {item}
            <span style={{ color: "var(--purple)", fontSize: "8px" }}>
              &#9679;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
