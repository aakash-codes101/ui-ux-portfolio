"use client";

import React from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/mockData";

export default function TestimonialsSection() {
  return (
    <section className="section-padding" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(13,148,136,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(13,148,136,0.1)",
              border: "1px solid rgba(13,148,136,0.25)",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              fontSize: "0.75rem",
              color: "#2dd4bf",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            💬 Student Stories
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: "800",
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}
          >
            Loved by <span className="gradient-text">500+ Students</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass glass-hover"
              style={{
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                {[...Array(t.rating)].map((_, si) => (
                  <Star
                    key={si}
                    size={16}
                    fill="#f59e0b"
                    color="#f59e0b"
                  />
                ))}
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#94a3b8",
                  lineHeight: "1.7",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${["#2563eb","#0d9488","#7c3aed"][i % 3]}, ${["#14b8a6","#3b82f6","#ec4899"][i % 3]})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#f1f5f9", fontSize: "0.9rem" }}>{t.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
