"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function AdminLoginPage() {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === "admin") router.push("/admin");
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed.");
      return;
    }

    const stored = localStorage.getItem("hostel_user");
    const loggedIn = stored ? JSON.parse(stored) : null;
    if (loggedIn?.role !== "admin") {
      logout();
      setError("This account does not have admin access.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 40%, #0f172a 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
      }}>
        {/* Glowing orbs */}
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", right: "-10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 10s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "20%",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }} />
        {/* Grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Left panel - Branding */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem",
        position: "relative",
        zIndex: 1,
      }} className="admin-left-panel">
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          color: "#7c3aed", textDecoration: "none", fontSize: "0.875rem",
          fontWeight: "500", marginBottom: "3rem",
          transition: "color 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7c3aed")}
        >
          <ChevronLeft size={16} /> Back to main site
        </Link>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            width: "72px", height: "72px",
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 20px 40px rgba(124,58,237,0.4)",
          }}>
            <Shield size={36} color="white" />
          </div>
          <h1 style={{
            fontSize: "2.5rem", fontWeight: "800", color: "#f1f5f9",
            lineHeight: 1.2, marginBottom: "1rem",
          }}>
            HMR Hostel<br />
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Admin Portal</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "380px" }}>
            Centralized management for students, rooms, fees, and reports — all in one powerful dashboard.
          </p>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { icon: "👥", text: "Manage student accounts & credentials" },
            { icon: "🏠", text: "Assign & track room allocations" },
            { icon: "💰", text: "Monitor fees & payment status" },
            { icon: "📋", text: "Review reports & student complaints" },
          ].map((item) => (
            <div key={item.text} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.625rem 1rem",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: "12px",
              color: "#cbd5e1", fontSize: "0.875rem",
            }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Login form */}
      <div style={{
        width: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        zIndex: 1,
        borderLeft: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
      }} className="admin-right-panel">
        <Link href="/" className="back-link-mobile" style={{
          alignItems: "center", gap: "0.5rem",
          color: "#a78bfa", textDecoration: "none", fontSize: "0.875rem",
          fontWeight: "500", zIndex: 10,
        }}>
          <ChevronLeft size={16} /> Back to home
        </Link>
        <div style={{ width: "100%", maxWidth: "380px" }}>
          {/* Header */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.25)",
              borderRadius: "99px",
              fontSize: "0.75rem", fontWeight: "600",
              color: "#a78bfa",
              marginBottom: "1.25rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              <Lock size={11} /> Secure Access
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.5rem" }}>
              Sign in as Admin
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Authorized personnel only
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "12px",
              padding: "0.875rem 1rem",
              marginBottom: "1.5rem",
              fontSize: "0.85rem",
              color: "#f87171",
              display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Email */}
            <div>
              <label style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                fontSize: "0.72rem", fontWeight: "700", color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.06em",
                marginBottom: "0.5rem",
              }}>
                <Mail size={12} /> Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hmrboyshostel.com"
                required
                style={{
                  background: "rgba(10,15,30,0.6)",
                  borderColor: "rgba(124,58,237,0.2)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                fontSize: "0.72rem", fontWeight: "700", color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: "0.06em",
                marginBottom: "0.5rem",
              }}>
                <Lock size={12} /> Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    paddingRight: "3rem",
                    background: "rgba(10,15,30,0.6)",
                    borderColor: "rgba(124,58,237,0.2)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute", right: "0.875rem", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    cursor: "pointer", color: "#64748b", display: "flex",
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Demo hint */}
            <div style={{
              padding: "0.75rem 1rem",
              background: "rgba(124,58,237,0.06)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: "10px",
              fontSize: "0.78rem",
              color: "#64748b",
              lineHeight: 1.6,
            }}>
              <span style={{ color: "#a78bfa", fontWeight: "600" }}>Demo credentials:</span><br />
              Email: <span style={{ color: "#cbd5e1" }}>admin@hmrboyshostel.com</span><br />
              Password: <span style={{ color: "#cbd5e1" }}>admin1234</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="admin-login-submit"
              disabled={loading}
              style={{
                background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "white",
                padding: "0.9rem",
                borderRadius: "14px",
                border: "none",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "all 0.3s",
                boxShadow: loading ? "none" : "0 10px 25px rgba(124,58,237,0.35)",
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(124,58,237,0.5)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(124,58,237,0.35)"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: "16px", height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {user && user.role !== "admin" && (
            <button
              onClick={logout}
              style={{
                width: "100%", marginTop: "1rem",
                background: "none", border: "none",
                color: "#ef4444", fontSize: "0.8rem",
                cursor: "pointer", textDecoration: "underline",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}
            >
              You are logged in as a student. Sign out first?
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .back-link-mobile { display: none !important; }
        @media (max-width: 900px) {
          .admin-left-panel { display: none !important; }
          .admin-right-panel { width: 100% !important; border: none !important; background: transparent !important; }
          .back-link-mobile { display: inline-flex !important; position: absolute; top: 1.5rem; left: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
