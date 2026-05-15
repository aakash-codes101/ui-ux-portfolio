"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, ChevronDown, ArrowRight, CheckCircle, Bed } from "lucide-react";
import { roomTypes } from "@/lib/mockData";
import heroImg from "../../public/hostel-hero.png";
import { supabase } from "@/lib/supabase";

type BookingFormData = {
  fullName: string;
  email: string;
  phone: string;
  roomType: string;
};

type FieldErrors = Partial<Record<keyof BookingFormData, string>>;

export default function HeroSection() {
  const [form, setForm] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    roomType: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!form.phone.match(/^\+?[\d\s\-()]{8,}$/)) e.phone = "Enter a valid phone number.";
    if (!form.roomType) e.roomType = "Please select a room type.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);

    // Save to Supabase for the Admin Panel
    try {
      const { error } = await supabase.from("inquiries").insert([{
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        room_type: form.roomType,
        status: "New"
      }]);
      if (error) throw error;
    } catch(err) {
      console.error("Failed to save inquiry to Supabase:", err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={heroImg}
          alt="StayEase hostel exterior"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        {/* Multi-layer overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 50%, rgba(15,23,42,0.6) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Decorative particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-float"
          style={{
            position: "absolute",
            borderRadius: "9999px",
            background: i % 2 === 0 ? "rgba(37,99,235,0.3)" : "rgba(13,148,136,0.3)",
            width: `${[8, 12, 6, 10, 8, 14][i]}px`,
            height: `${[8, 12, 6, 10, 8, 14][i]}px`,
            top: `${[15, 25, 60, 70, 40, 80][i]}%`,
            left: `${[10, 85, 5, 90, 50, 30][i]}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.4}s`,
            zIndex: 1,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "6rem 1.5rem 3rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: Copy */}
        <div>
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.3)",
              borderRadius: "9999px",
              padding: "0.375rem 1rem",
              fontSize: "0.8rem",
              color: "#60a5fa",
              fontWeight: "600",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "6px", height: "6px", background: "#22c55e", borderRadius: "9999px", display: "inline-block" }} />
            Now Accepting Applications for 2026–27
          </div>

          <h1
            className="animate-fade-in-up anim-delay-100"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              color: "#f1f5f9",
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            Your Home Away
            <br />
            <span className="gradient-text">From Home.</span>
          </h1>

          <p
            className="animate-fade-in-up anim-delay-200"
            style={{
              fontSize: "1.1rem",
              color: "#94a3b8",
              lineHeight: "1.7",
              maxWidth: "480px",
              marginBottom: "2rem",
            }}
          >
            Experience safe, modern, and community-driven student living. Fully furnished rooms, nutritious meals, and everything you need — under one roof.
          </p>

          <div
            className="animate-fade-in-up anim-delay-300"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
          >
            <Link href="/auth" className="btn-primary" id="hero-book-btn">
              Book a Room <ArrowRight size={16} />
            </Link>
            <Link href="/#features" className="btn-outline" id="hero-explore-btn">
              Explore Amenities
            </Link>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in-up anim-delay-400"
            style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
          >
            {[
              { num: "500+", label: "Happy Students" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "4.9★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#f1f5f9" }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking Form */}
        <div
          className="glass animate-fade-in-up anim-delay-200"
          style={{
            borderRadius: "24px",
            padding: "2rem",
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem 1rem",
              }}
              className="animate-fade-in"
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  background: "rgba(34,197,94,0.15)",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                <CheckCircle size={36} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.75rem" }}>
                Inquiry Received! 🎉
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                Thank you, <strong style={{ color: "#f1f5f9" }}>{form.fullName}</strong>! We&apos;ve received your booking inquiry and will contact you at <strong style={{ color: "#60a5fa" }}>{form.email}</strong> within 24 hours.
              </p>
              <button
                className="btn-outline"
                onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", phone: "", roomType: "" }); }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f1f5f9" }}>
                  Book / Inquire Now
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>
                  Fill in your details and we&apos;ll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {/* Full Name */}
                  <div>
                    <label style={labelStyle}>
                      <User size={13} /> Full Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="Arjun Sharma"
                      className={`input-field ${errors.fullName ? "error" : ""}`}
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    {errors.fullName && <p style={errStyle}>{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>
                      <Mail size={13} /> Email Address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="you@example.com"
                      className={`input-field ${errors.email ? "error" : ""}`}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p style={errStyle}>{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>
                      <Phone size={13} /> Phone Number
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={`input-field ${errors.phone ? "error" : ""}`}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                  </div>



                  {/* Room Type */}
                  <div>
                    <label style={labelStyle}>
                      <Bed size={13} /> Room Type
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="booking-room-type"
                        className={`input-field ${errors.roomType ? "error" : ""}`}
                        value={form.roomType}
                        onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                        style={{ appearance: "none", colorScheme: "dark", paddingRight: "2.5rem" }}
                      >
                        <option value="" style={{ background: "#1e293b" }}>Select a room type…</option>
                        {roomTypes.map((r) => (
                          <option key={r.value} value={r.value} style={{ background: "#1e293b" }}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#64748b",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                    {errors.roomType && <p style={errStyle}>{errors.roomType}</p>}
                  </div>

                  <button
                    id="booking-submit-btn"
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid white",
                            borderRadius: "9999px",
                            animation: "spin 0.8s linear infinite",
                            display: "inline-block",
                          }}
                        />
                        Sending Inquiry…
                      </>
                    ) : (
                      <>
                        Send Inquiry <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 7rem !important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  fontSize: "0.78rem",
  fontWeight: "600",
  color: "#94a3b8",
  marginBottom: "0.375rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const errStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#f87171",
  marginTop: "0.25rem",
};
