"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Update this to Sakcham's actual WhatsApp number (country code + number, no spaces/dashes)
const WHATSAPP_NUMBER = "919999999999";
const WHATSAPP_MESSAGE = "Hi Sakcham, I'd like to learn more about Thryve's revenue systems.";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: isMobile ? "16px" : "32px",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      }}
    >
      {/* Book Audit — scroll-triggered */}
      {!isMobile && (
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: visible ? "all" : "none",
          }}
        >
          <Link
            href="/contact"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FAFAFA",
              background: "var(--purple)",
              padding: "12px 20px",
              borderRadius: "100px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 8px 32px rgba(123,47,190,0.4)",
              letterSpacing: "0.03em",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px) scale(1.03)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 12px 40px rgba(123,47,190,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0) scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(123,47,190,0.4)";
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FAFAFA",
                opacity: 0.7,
                display: "inline-block",
              }}
            />
            Book Free Audit
          </Link>
        </div>
      )}

      {/* WhatsApp — always visible */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with Sakcham on WhatsApp"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--purple)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "100px",
          padding: isMobile ? "10px 16px" : "11px 18px",
          boxShadow: "0 6px 24px rgba(123,47,190,0.35)",
          textDecoration: "none",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.04)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 32px rgba(123,47,190,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(123,47,190,0.35)";
        }}
      >
        {/* WhatsApp icon (inline SVG, brand-purple themed) */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="rgba(255,255,255,0.85)"/>
        </svg>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
          Chat with Sakcham
        </span>
      </a>
    </div>
  );
}
