"use client";
import React, { useState } from "react";
import { UserPlus, Eye, EyeOff, CheckCircle2, Lock, User, Phone, Mail, IndianRupee, Shield } from "lucide-react";
import { AddedStudent } from "@/lib/useAdminData";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
  onSuccess: () => void;
}

const lbl: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", color: "#64748b", fontWeight: "700",
  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem",
};

export default function AdminCreateStudent({ data, onSuccess }: Props) {
  const { addStudent } = data;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [roomType, setRoomType] = useState("Single Room");
  const [monthlyRate, setMonthlyRate] = useState(8500);
  const [planType, setPlanType] = useState<AddedStudent["planType"]>("Yearly");
  const [paymentPlan, setPaymentPlan] = useState<AddedStudent["paymentPlan"]>("3 payments (every 4 months)");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const yearlyFee = monthlyRate * 12;
  const installment = paymentPlan === "One time (full year)" ? yearlyFee : Math.round(yearlyFee / 3);

  const reset = () => { setName(""); setUsername(""); setPhone(""); setEmail(""); setAadharNumber(""); setPassword(""); setRoomType("Single Room"); setMonthlyRate(8500); setPlanType("Yearly"); setPaymentPlan("3 payments (every 4 months)"); setError(null); setSuccess(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) { setError("Full name is required."); return; }
    if (!username.trim() || username.length < 3) { setError("Username must be at least 3 characters."); return; }
    if (!/^[a-z0-9_]+$/.test(username)) { setError("Username can only contain lowercase letters, numbers and underscores."); return; }
    if (!phone.trim()) { setError("Phone number is required."); return; }
    if (!aadharNumber.trim() || aadharNumber.length < 12) { setError("Please enter a valid 12-digit Aadhar Number."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }

    try {
      await addStudent({ name, username, email, phone, roomType, accommodationRate: monthlyRate, yearlyFee, monthlyFee: monthlyRate, paymentPlan, planType, password, aadharNumber });
      setSuccess(`Account created for ${name}! They can sign in with username: @${username}`);
      setTimeout(() => { reset(); onSuccess(); }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create student account. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: "560px", margin: "4rem auto", textAlign: "center" }}>
        <div style={{ width: "80px", height: "80px", background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <CheckCircle2 size={38} color="#10b981" />
        </div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.5rem" }}>Student Account Created!</h3>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>{success}</p>
        <p style={{ color: "#475569", fontSize: "0.8rem", marginTop: "0.5rem" }}>Redirecting to student list…</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: "700px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9" }}>Add New Student</h2>
        <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.2rem" }}>Create login credentials and fee schedule for a new resident.</p>
      </div>

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "12px", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", color: "#f87171", fontSize: "0.85rem" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Section 1 */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#7c3aed", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={15} /> Student Information
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={lbl}>Full Name *</label>
              <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Arjun Sharma" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
            <div>
              <label style={lbl}><User size={11} style={{ display: "inline" }} /> Username * (Login ID)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#7c3aed", fontWeight: "700", fontSize: "0.9rem" }}>@</span>
                <input className="input-field" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="arjun_sharma" style={{ paddingLeft: "1.875rem", background: "rgba(0,0,0,0.2)" }} />
              </div>
            </div>
            <div>
              <label style={lbl}><Phone size={11} style={{ display: "inline" }} /> Phone Number *</label>
              <input type="tel" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
            <div>
              <label style={lbl}><Mail size={11} style={{ display: "inline" }} /> Email (optional)</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="arjun@example.com" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
            <div>
              <label style={lbl}><Shield size={11} style={{ display: "inline" }} /> Aadhar Number *</label>
              <input type="text" className="input-field" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, "").substring(0, 12))} placeholder="1234 5678 9012" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#7c3aed", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lock size={15} /> Login Password
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "1rem" }}>Student signs in using their <strong style={{ color: "#a78bfa" }}>@username</strong> and this password.</p>
          <div style={{ position: "relative", maxWidth: "340px" }}>
            <input
              type={showPw ? "text" : "password"}
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              style={{ paddingRight: "3rem", background: "rgba(0,0,0,0.2)" }}
            />
            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex" }}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Section 3 */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: "700", color: "#7c3aed", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IndianRupee size={15} /> Room & Fee Setup
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={lbl}>Room Type</label>
              <select className="input-field" value={roomType} onChange={(e) => setRoomType(e.target.value)} style={{ colorScheme: "dark", background: "rgba(0,0,0,0.2)" }}>
                <option>Single Room</option>
                <option>Double Occupancy</option>
                <option>Triple Occupancy</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Monthly Rent (₹)</label>
              <input type="number" className="input-field" value={monthlyRate} min={1000} onChange={(e) => setMonthlyRate(Number(e.target.value))} style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
            <div>
              <label style={lbl}>Plan Type</label>
              <select className="input-field" value={planType} onChange={(e) => setPlanType(e.target.value as AddedStudent["planType"])} style={{ colorScheme: "dark", background: "rgba(0,0,0,0.2)" }}>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Payment Schedule</label>
              <select className="input-field" value={paymentPlan} onChange={(e) => setPaymentPlan(e.target.value as AddedStudent["paymentPlan"])} style={{ colorScheme: "dark", background: "rgba(0,0,0,0.2)" }}>
                <option value="3 payments (every 4 months)">3 Instalments (Every 4 months)</option>
                <option value="One time (full year)">One Time (Full Year Upfront)</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Fee preview */}
          <div style={{ background: "rgba(5,150,105,0.07)", border: "1px solid rgba(5,150,105,0.15)", borderRadius: "12px", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.7rem", color: "#475569", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.875rem" }}>Fee Preview</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              {[
                { l: "Monthly Rent", v: `₹${monthlyRate.toLocaleString("en-IN")}`, highlight: false },
                { l: "Yearly Total", v: `₹${yearlyFee.toLocaleString("en-IN")}`, highlight: true },
                { l: paymentPlan === "One time (full year)" ? "Pay Once" : "Each Instalment", v: `₹${installment.toLocaleString("en-IN")}`, highlight: false },
              ].map((item) => (
                <div key={item.l}>
                  <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "3px" }}>{item.l}</p>
                  <p style={{ fontSize: "1.15rem", fontWeight: "800", color: item.highlight ? "#10b981" : "#f1f5f9" }}>{item.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="button" onClick={reset} style={{ flex: 1, padding: "0.875rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#64748b", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
            Clear Form
          </button>
          <button type="submit" style={{ flex: 2, padding: "0.875rem", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 8px 20px rgba(124,58,237,0.3)" }}>
            <UserPlus size={16} /> Create Student Account
          </button>
        </div>
      </form>
    </div>
  );
}
