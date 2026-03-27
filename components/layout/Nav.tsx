"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/methodology", label: "Methodology", preview: "How the four-pillar system works — and why the sequence matters." },
  { href: "/work", label: "Work", preview: "Real results from real brands. D2C, B2B, B2C, C2C." },
  { href: "/playbook", label: "Playbook", preview: "Free frameworks used in every Thryve engagement." },
  { href: "/contact", label: "Contact", preview: "Book a free 15-minute audit. No pitch. No fluff." },
];

function NavPreview({ text }: { text: string }) {
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--surface)",
      border: "1px solid var(--border-strong)",
      borderRadius: "10px",
      padding: "10px 14px",
      width: "200px",
      pointerEvents: "none",
      zIndex: 1100,
      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      animation: "previewIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards",
    }}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px",
        color: "var(--text-secondary)",
        lineHeight: 1.6,
        margin: 0,
      }}>{text}</p>
    </div>
  );
}

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("thryve-theme");
    if (saved === "dark") {
      setDark(true);
    }
    // Sync dark state with document attribute (ThemeInit may have set it)
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("thryve-theme", next ? "dark" : "light");
  };

  return (
    <>
      <style>{`
        @keyframes previewIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-mobile { display: none !important; }
        .nav-desktop { display: flex !important; }
        @media (max-width: 768px) {
          .nav-mobile { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          zIndex: 1000,
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled || menuOpen ? "var(--surface)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              zIndex: 1001,
            }}
          >
            Thryve
          </Link>

          {/* Desktop center island */}
          <div
            className="nav-desktop nav-desktop-island"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: "transparent",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "5px",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: isActive ? "var(--bg)" : "var(--text)",
                      textDecoration: "none",
                      padding: "8px 18px",
                      borderRadius: "100px",
                      background: isActive ? "var(--text)" : "transparent",
                      transition: "all 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    {link.label}
                  </Link>
                  {hoveredLink === link.href && !isActive && (
                    <NavPreview text={link.preview} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop right */}
          <div
            className="nav-desktop nav-desktop-right"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <button
              onClick={toggleTheme}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--border)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <Link
              href="/contact"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--bg)",
                background: "var(--text)",
                padding: "10px 22px",
                borderRadius: "100px",
                textDecoration: "none",
              }}
            >
              Book Audit
            </Link>
          </div>

          {/* Mobile right */}
          <div
            className="nav-mobile nav-mobile-controls"
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <button
              onClick={toggleTheme}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--border)",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "transparent",
                border: "1px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "8px",
              }}
            >
              <span style={{ width: "18px", height: "1.5px", background: "var(--text)", borderRadius: "1px", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none", transition: "transform 0.3s ease", display: "block" }} />
              <span style={{ width: "18px", height: "1.5px", background: "var(--text)", borderRadius: "1px", opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s ease", display: "block" }} />
              <span style={{ width: "18px", height: "1.5px", background: "var(--text)", borderRadius: "1px", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none", transition: "transform 0.3s ease", display: "block" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="nav-mobile"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "var(--bg)",
          zIndex: 999,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          padding: "40px 32px",
        }}
      >
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 8vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: pathname === link.href ? "var(--purple)" : "var(--text)",
              textDecoration: "none",
              padding: "16px 0",
              borderBottom: "1px solid var(--border)",
              display: "block",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          style={{
            marginTop: "32px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            color: "#FAFAFA",
            background: "var(--purple)",
            padding: "16px 32px",
            borderRadius: "100px",
            textDecoration: "none",
            display: "inline-flex",
            width: "fit-content",
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            opacity: menuOpen ? 1 : 0,
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.24s",
          }}
        >
          Book Free Audit
        </Link>
      </div>
    </>
  );
}
