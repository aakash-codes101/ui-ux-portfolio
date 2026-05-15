"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Check, ArrowRight } from "lucide-react";
import singleRoomImg from "../../public/single-room.png";
import doubleRoomImg from "../../public/double-seater.png";
import tripleRoomImg from "../../public/triple-seater.jpg";

const rooms = [
  {
    type: "Single Room",
    value: "single",
    price: "₹17,000",
    period: "/month",
    image: singleRoomImg,
    capacity: 1,
    features: ["Private room", "Personal bathroom", "Study desk & chair", "Wardrobe", "AC"],
    badge: "Most Private",
    badgeColor: "#8b5cf6",
  },
  {
    type: "Double Occupancy",
    value: "double",
    price: "₹13,000",
    period: "/month",
    image: doubleRoomImg,
    capacity: 2,
    features: ["Shared with 1 person", "Semi-private bathroom", "Study area", "Bunk beds", "AC"],
    badge: "Most Popular",
    badgeColor: "#2563eb",
    featured: true,
  },
  {
    type: "Triple Occupancy",
    value: "triple",
    price: "₹120,000",
    period: "/month",
    image: tripleRoomImg,
    capacity: 3,
    features: ["Shared with 2 others", "Common bathroom", "Shared study area", "Individual lockers", "AC"],
    badge: "Best Value",
    badgeColor: "#0d9488",
  },
];

export default function RoomsSection() {
  return (
    <section
      id="rooms"
      className="section-padding"
      style={{
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
            🛏 Room Options
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: "800",
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Find Your <span className="gradient-text">Perfect Space</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
            Choose from a range of room types to match your budget, lifestyle, and preferences.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {rooms.map((room) => (
            <div
              key={room.type}
              className="glass"
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                border: room.featured
                  ? "1.5px solid rgba(37,99,235,0.4)"
                  : "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(37,99,235,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  zIndex: 10,
                  background: room.badgeColor,
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                }}
              >
                {room.badge}
              </div>

              {/* Image */}
              <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <Image
                  src={room.image}
                  alt={room.type}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f1f5f9" }}>
                    {room.type}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#64748b",
                      fontSize: "0.8rem",
                    }}
                  >
                    <Users size={13} />
                    {room.capacity} {room.capacity === 1 ? "person" : "persons"}
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: "800", color: "#f1f5f9" }}>
                    {room.price}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{room.period}</span>
                </div>

                <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                  {room.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        color: "#94a3b8",
                        padding: "0.25rem 0",
                      }}
                    >
                      <Check size={14} color="#22c55e" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/auth`}
                  className={room.featured ? "btn-primary" : "btn-outline"}
                  style={{ width: "100%", justifyContent: "center" }}
                  id={`book-${room.value}-btn`}
                >
                  Book This Room <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
