"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";

type Tab = "login" | "forgot";

function AuthPageContent() {
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const [tab, setTab] = useState<Tab>("login");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login state
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  // Forgot state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") router.push("/admin");
      else router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginId || !loginPw) { setError("Please fill in all fields."); return; }
    if (loginPw.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    const result = await login(loginId, loginPw);
    setLoading(false);
    if (!result.success) setError(result.error || "Login failed.");
    else {
      // Prevent admins from logging in via the student portal
      const stored = localStorage.getItem("hostel_user");
      const loggedInUser = stored ? JSON.parse(stored) : null;
      if (loggedInUser?.role === "admin") {
        logout();
        setError("Invalid email or password.");
      }
      else router.push("/dashboard");
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!forgotEmail.includes("@")) { setError("Enter a valid email address."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setForgotSent(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(13,148,136,0.1) 0%, transparent 60%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "460px",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#64748b",
            textDecoration: "none",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <ArrowLeft size={15} /> Back to home
        </Link>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #2563eb, #0d9488)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "white",
              margin: "0 auto 0.75rem",
            }}
          >
            HMR
          </div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#f1f5f9" }}>
            HMR Boys <span style={{ color: "#60a5fa" }}>Hostel</span>
          </h1>
          <p style={{ fontSize: "0.825rem", color: "#64748b", marginTop: "0.25rem" }}>
            {tab === "login" ? "Sign in to your resident account" : "Recover your account"}
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ borderRadius: "24px", overflow: "hidden" }}>
          <div style={{ padding: "2rem" }}>
            {/* Error */}
            {error && (
              <div
                className="animate-fade-in"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  fontSize: "0.8rem",
                  color: "#f87171",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* === LOGIN FORM === */}
            {tab === "login" && (
              <form onSubmit={handleLogin} noValidate>
                <FormField
                  id="login-id"
                  label="Contact No. / Admin Email"
                  icon={<Mail size={14} />}
                  type="text"
                  placeholder="+91 98765 43210 or admin@..."
                  value={loginId}
                  onChange={setLoginId}
                />
                <div style={{ marginBottom: "0.5rem" }}>
                  <FormField
                    id="login-password"
                    label="Password"
                    icon={<Lock size={14} />}
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPw}
                    onChange={setLoginPw}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex" }}
                      >
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />
                </div>
                <div style={{ textAlign: "right", marginBottom: "1.25rem" }}>
                  <button
                    type="button"
                    id="forgot-pw-link"
                    onClick={() => { setTab("forgot"); setError(null); }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#60a5fa",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <SubmitButton loading={loading} label="Sign In" />

                <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8rem", color: "#475569" }}>
                  Don&apos;t have an account?{" "}
                  <span style={{ color: "#64748b" }}>Contact your hostel warden to get access.</span>
                </p>
              </form>
            )}

            {/* === FORGOT PASSWORD === */}
            {tab === "forgot" && (
              <>
                {forgotSent ? (
                  <div style={{ textAlign: "center", padding: "1rem 0" }} className="animate-fade-in">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "rgba(34,197,94,0.1)",
                        borderRadius: "9999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        border: "1px solid rgba(34,197,94,0.2)",
                      }}
                    >
                      <CheckCircle size={28} color="#22c55e" />
                    </div>
                    <h3 style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "0.5rem" }}>Check your inbox!</h3>
                    <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1.5rem" }}>
                      If <strong style={{ color: "#f1f5f9" }}>{forgotEmail}</strong> is registered, you&apos;ll receive reset instructions within a few minutes.
                    </p>
                    <button
                      onClick={() => { setTab("login"); setForgotSent(false); setForgotEmail(""); }}
                      className="btn-outline"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <ArrowLeft size={15} /> Back to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} noValidate>
                    <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginBottom: "1.25rem", lineHeight: "1.6" }}>
                      Enter your registered email address and we&apos;ll send you a password reset link.
                    </p>
                    <FormField
                      id="forgot-email"
                      label="Registered Email"
                      icon={<Mail size={14} />}
                      type="email"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={setForgotEmail}
                    />
                    <SubmitButton loading={loading} label="Send Reset Link" />
                    <button
                      type="button"
                      onClick={() => { setTab("login"); setError(null); }}
                      style={{
                        width: "100%",
                        marginTop: "0.75rem",
                        background: "none",
                        border: "none",
                        color: "#64748b",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "color 0.2s",
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Sign In
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components ----

function FormField({
  id,
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#94a3b8",
          marginBottom: "0.375rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {icon} {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field"
          style={suffix ? { paddingRight: "2.5rem" } : {}}
        />
        {suffix && (
          <div style={{ position: "absolute", right: "0.75rem" }}>{suffix}</div>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      className="btn-primary"
      disabled={loading}
      style={{
        width: "100%",
        justifyContent: "center",
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
          Please wait…
        </>
      ) : (
        <>
          {label} <ArrowRight size={16} />
        </>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageContent />
    </Suspense>
  );
}
