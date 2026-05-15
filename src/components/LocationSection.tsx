"use client";

import React from "react";
import { MapPin } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="section-padding" style={{ position: "relative", overflow: "hidden" }} id="location">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)",
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
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.25)",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              fontSize: "0.75rem",
              color: "#60a5fa",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            <MapPin size={14} /> Find Us Here
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: "800",
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}
          >
            Hostel <span className="gradient-text">Location</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            HMR BOYS HOSTEL, Plot Number 40B, near Sharda University, Knowledge Park III, Greater Noida, Uttar Pradesh 201310
          </p>
        </div>

        <div className="glass animate-fade-in-up anim-delay-200" style={{ borderRadius: "24px", overflow: "hidden", padding: "0.5rem" }}>
          <div style={{ borderRadius: "20px", overflow: "hidden", height: "450px", position: "relative" }}>
            <iframe
              title="HMR Boys Hostel Location"
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=HMR%20BOYS%20HOSTEL,%20Plot%20Number%2040B,%20near%20Sharda%20University,%20Knowledge%20Park%20III,%20Greater%20Noida,%20Uttar%20Pradesh%20201310+(HMR%20Boys%20Hostel)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.2) opacity(0.9)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
