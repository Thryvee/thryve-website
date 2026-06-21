"use client";
import { useEffect } from "react";

export default function LoginRedirect() {
  useEffect(() => {
    // Redirect to the dashboard app
    // Update this URL once the dashboard is deployed on Vercel
    window.location.href = "https://dashboard.thhryve.com/login";
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "32px",
            fontWeight: 500,
            marginBottom: "16px",
          }}
        >
          THR<span style={{ color: "#8B5CF6" }}>Y</span>VE
        </p>
        <p style={{ fontSize: "14px", color: "rgba(250,250,250,0.5)" }}>
          Redirecting to dashboard...
        </p>
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderTopColor: "#8B5CF6",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "24px auto 0",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
