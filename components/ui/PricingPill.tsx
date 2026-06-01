export default function PricingPill() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "100px",
        background: "var(--purple-light)",
        border: "1px solid var(--purple-mid)",
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          color: "var(--purple)",
          letterSpacing: "0.06em",
        }}
      >
        From Rs 20k · Pilot month
      </span>
    </div>
  );
}
