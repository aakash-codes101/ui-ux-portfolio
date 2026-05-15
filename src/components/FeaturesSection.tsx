"use client";

import React from "react";
import {
  Wifi,
  Shield,
  Utensils,
  WashingMachine,
  BookOpen,
  Dumbbell,
  Bus,
  HeartPulse,
  Refrigerator,
} from "lucide-react";
import { amenities } from "@/lib/mockData";

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={24} />,
  Shield: <Shield size={24} />,
  Utensils: <Utensils size={24} />,
  WashingMachine: <WashingMachine size={24} />,
  BookOpen: <BookOpen size={24} />,
  Dumbbell: <Dumbbell size={24} />,
  Bus: <Bus size={24} />,
  HeartPulse: <HeartPulse size={24} />,
  Refrigerator: <Refrigerator size={24} />,
};

const iconColors = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#06b6d4",
  "#8b5cf6",
  "#f97316",
  "#ec4899",
  "#14b8a6",
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-padding"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
            ⭐ World-Class Amenities
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: "800",
              color: "#f1f5f9",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            Everything You Need,{" "}
            <span className="gradient-text">All in One Place</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            We&apos;ve thought of every detail so you can focus on what matters most — your studies and your growth.
          </p>
        </div>

        {/* Amenities grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className="glass glass-hover"
              style={{
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: `${iconColors[index]}18`,
                  border: `1px solid ${iconColors[index]}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: iconColors[index],
                  marginBottom: "1.25rem",
                }}
              >
                {iconMap[item.icon]}
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
