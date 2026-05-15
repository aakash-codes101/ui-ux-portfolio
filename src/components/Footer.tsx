"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "linear-gradient(135deg, #2563eb, #0d9488)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                HMR
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9" }}>
                HMR <span style={{ color: "#60a5fa" }}>Boys Hostel</span>
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: "1.7", maxWidth: "280px", marginBottom: "1.5rem" }}>
              Modern student hostel designed for comfort, safety, and community. Your academic journey deserves the best foundation.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { 
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ), 
                  href: "https://www.instagram.com/hmrboyshostel/", 
                  label: "Instagram" 
                },
                { icon: <Globe size={16} />, href: "#", label: "Website" },
                { icon: <MessageCircle size={16} />, href: "#", label: "Chat" },
                { icon: <Share2 size={16} />, href: "#", label: "Share" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37,99,235,0.15)";
                    e.currentTarget.style.color = "#60a5fa";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f1f5f9", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { label: "Home", href: "/" },
                { label: "Amenities", href: "/#features" },
                { label: "Rooms", href: "/#rooms" },
                { label: "Apply Now", href: "/auth" },
                { label: "Login", href: "/auth" },
                { label: "Rules & Regulations", href: "/rules" },
              ].map((l) => (
                <li key={l.label} style={{ marginBottom: "0.625rem" }}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "#64748b",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                  >
                    <ArrowRight size={12} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Room types */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f1f5f9", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Room Types
            </h4>
            <ul style={{ listStyle: "none" }}>
              {[
                "Single Room",
                "Double Occupancy",
                "Triple Occupancy",
              ].map((r) => (
                <li key={r} style={{ marginBottom: "0.625rem" }}>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                    }}
                  >
                    <ArrowRight size={12} />
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#f1f5f9", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                {
                  icon: <MapPin size={15} />,
                  text: "HMR BOYS HOSTEL, Plot Number 40B, near Sharda University, Knowledge Park III, Greater Noida, Uttar Pradesh 201310",
                },
                {
                  icon: <Phone size={15} />,
                  text: "+91 9354945827",
                },
                {
                  icon: <Phone size={15} />,
                  text: "+91 87666334708",
                },

              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#2563eb", marginTop: "1px", flexShrink: 0 }}>{c.icon}</span>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: "1.5" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#475569" }}>
            © {year} HMR Boys Hostel. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Rules & Regulations", href: "/rules" }
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                style={{ fontSize: "0.8rem", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
