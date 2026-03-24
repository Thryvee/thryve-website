export default function MarqueeStrip() {
  const items = [
    "Acquire",
    "Convert",
    "Retain",
    "Scale",
    "Grow",
    "Systematise",
  ];
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: "var(--text)",
        padding: "20px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(250,250,250,0.06)",
        borderBottom: "1px solid rgba(250,250,250,0.06)",
      }}
    >
      <div style={{ marginBottom: "10px", display: "flex" }}>
        <div
          className="marquee-l"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animationDuration: "18s",
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                padding: "0 28px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(250,250,250,0.7)",
                display: "inline-flex",
                alignItems: "center",
                gap: "28px",
              }}
            >
              {item}
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--purple)",
                  display: "inline-block",
                }}
              />
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="marquee-r"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animationDuration: "18s",
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                padding: "0 28px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(250,250,250,0.35)",
                display: "inline-flex",
                alignItems: "center",
                gap: "28px",
                fontStyle: "italic",
              }}
            >
              {item}
              <span
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(250,250,250,0.2)",
                  display: "inline-block",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
