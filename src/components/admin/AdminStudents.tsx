"use client";
import React, { useState } from "react";
import { IndianRupee, Trash2, AlertTriangle, UserPlus } from "lucide-react";
import { AddedStudent } from "@/lib/useAdminData";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
}

export default function AdminStudents({ data }: Props) {
  const { students, deleteStudent, markFeePaid } = data;
  const [removeTarget, setRemoveTarget] = useState<AddedStudent | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [payTarget, setPayTarget] = useState<AddedStudent | null>(null);
  const [payAmount, setPayAmount] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roomNumber?.toLowerCase().includes(search.toLowerCase()) ||
    s.username?.toLowerCase().includes(search.toLowerCase())
  );

  const th: React.CSSProperties = { padding: "0.875rem 1.25rem", color: "#475569", fontWeight: "700", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" };
  const td: React.CSSProperties = { padding: "1rem 1.25rem", verticalAlign: "middle" };

  return (
    <div className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9" }}>Registered Students</h2>
          <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.2rem" }}>{students.length} student{students.length !== 1 ? "s" : ""} in the system</p>
        </div>
        <input
          placeholder="Search by name, room, username…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
          style={{ maxWidth: "280px", background: "rgba(255,255,255,0.04)" }}
        />
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { l: "Total Students", v: students.length, c: "#7c3aed" },
          { l: "Yearly Revenue", v: `₹${students.reduce((a, s) => a + s.yearlyFee, 0).toLocaleString("en-IN")}`, c: "#059669" },
          { l: "Collected", v: `₹${students.reduce((a, s) => a + s.feePaid, 0).toLocaleString("en-IN")}`, c: "#0891b2" },
          { l: "Outstanding", v: `₹${students.reduce((a, s) => a + Math.max(0, s.yearlyFee - s.feePaid), 0).toLocaleString("en-IN")}`, c: "#dc2626" },
        ].map((c) => (
          <div key={c.l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.1rem" }}>
            <p style={{ fontSize: "0.68rem", color: "#475569", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>{c.l}</p>
            <p style={{ fontSize: "1.4rem", fontWeight: "800", color: c.c }}>{c.v}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                <th style={th}>Student</th>
                <th style={th}>Username</th>
                <th style={th}>Room</th>
                <th style={th}>Aadhar No.</th>
                <th style={th}>Monthly</th>
                <th style={th}>Fee Progress</th>
                <th style={th}>Plan</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "#475569" }}>
                    <UserPlus size={32} style={{ display: "block", margin: "0 auto 0.75rem", opacity: 0.3 }} />
                    {search ? "No students match your search." : "No students yet."}
                  </td>
                </tr>
              ) : filtered.map((s) => {
                const remaining = s.yearlyFee - s.feePaid;
                const pct = Math.min(100, Math.round((s.feePaid / Math.max(s.yearlyFee, 1)) * 100));
                const allPaid = remaining <= 0;
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={td}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#a78bfa", fontSize: "0.8rem", flexShrink: 0 }}>{s.avatar}</div>
                        <div>
                          <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.875rem" }}>{s.name}</p>
                          <p style={{ fontSize: "0.72rem", color: "#475569" }}>{s.phone || s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={td}>
                      <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#a78bfa", background: "rgba(124,58,237,0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                        {s.username || "—"}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={{
                        padding: "3px 10px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600",
                        background: s.roomAssigned ? "rgba(8,145,178,0.12)" : "rgba(245,158,11,0.1)",
                        color: s.roomAssigned ? "#22d3ee" : "#f59e0b",
                      }}>
                        {s.roomNumber || "TBD"}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: "0.8rem", color: "#64748b", fontFamily: "monospace" }}>
                        {s.aadharNumber || "—"}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>₹{s.accommodationRate.toLocaleString("en-IN")}</span>
                    </td>
                    <td style={{ ...td, minWidth: "180px" }}>
                      <div style={{ marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.78rem", color: allPaid ? "#10b981" : "#f59e0b", fontWeight: "700" }}>
                          {allPaid ? "✓ Fully Paid" : `₹${remaining.toLocaleString("en-IN")} left`}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "#475569" }}>{pct}%</span>
                      </div>
                      <div style={{ height: "5px", background: "rgba(255,255,255,0.07)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: allPaid ? "#10b981" : "linear-gradient(90deg,#7c3aed,#06b6d4)", borderRadius: "99px", transition: "width 0.4s" }} />
                      </div>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: "0.72rem", padding: "3px 9px", borderRadius: "7px", background: "rgba(124,58,237,0.1)", color: "#a78bfa", fontWeight: "600" }}>
                        {s.planType}
                      </span>
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          disabled={allPaid}
                          onClick={() => { setPayTarget(s); setPayAmount(Math.round(s.yearlyFee / 3)); }}
                          style={{
                            background: allPaid ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px",
                            padding: "5px 10px", color: allPaid ? "#374151" : "#10b981",
                            cursor: allPaid ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", whiteSpace: "nowrap",
                          }}
                        >
                          <IndianRupee size={12} /> Mark Paid
                        </button>
                        <button
                          onClick={() => { setRemoveTarget(s); setConfirmText(""); }}
                          style={{
                            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: "8px", padding: "5px 10px", color: "#f87171",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem",
                          }}
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay modal */}
      {payTarget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} onClick={() => setPayTarget(null)} />
          <div style={{ position: "relative", zIndex: 1, background: "#0d1117", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "400px" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(16,185,129,0.12)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <IndianRupee size={24} color="#10b981" />
              </div>
              <h3 style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "0.3rem" }}>Record Payment</h3>
              <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
                {payTarget.name} · Outstanding: <strong style={{ color: "#f59e0b" }}>₹{(payTarget.yearlyFee - payTarget.feePaid).toLocaleString("en-IN")}</strong>
              </p>
            </div>
            <label style={{ display: "block", fontSize: "0.72rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Amount Received (₹)</label>
            <input type="number" className="input-field" value={payAmount} min={1} max={payTarget.yearlyFee - payTarget.feePaid} onChange={(e) => setPayAmount(Number(e.target.value))} style={{ marginBottom: "1rem", background: "rgba(0,0,0,0.3)" }} />
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <button onClick={() => setPayAmount(Math.round(payTarget.yearlyFee / 3))} style={{ fontSize: "0.75rem", padding: "4px 10px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: "8px", color: "#f59e0b", cursor: "pointer" }}>
                1 Instalment
              </button>
              <button onClick={() => setPayAmount(payTarget.yearlyFee - payTarget.feePaid)} style={{ fontSize: "0.75rem", padding: "4px 10px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", color: "#10b981", cursor: "pointer" }}>
                Full Remaining
              </button>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setPayTarget(null)} style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
              <button disabled={payAmount <= 0} onClick={() => { markFeePaid(payTarget.id, payAmount); setPayTarget(null); }} style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#10b981,#0891b2)", color: "white", fontWeight: "700", cursor: payAmount <= 0 ? "not-allowed" : "pointer", opacity: payAmount <= 0 ? 0.5 : 1 }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {removeTarget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }} onClick={() => setRemoveTarget(null)} />
          <div style={{ position: "relative", zIndex: 1, background: "#0d1117", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "400px", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", background: "rgba(239,68,68,0.12)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <AlertTriangle size={24} color="#ef4444" />
            </div>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "0.5rem" }}>Remove {removeTarget.name}?</h3>
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Type <strong style={{ color: "#ef4444" }}>CONFIRM</strong> to permanently remove this student.
            </p>
            <input className="input-field" placeholder="Type CONFIRM" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} style={{ textAlign: "center", marginBottom: "1.25rem", background: "rgba(0,0,0,0.3)" }} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setRemoveTarget(null)} style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
              <button disabled={confirmText !== "CONFIRM"} onClick={() => { deleteStudent(removeTarget.id); setRemoveTarget(null); }} style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "none", background: confirmText === "CONFIRM" ? "#ef4444" : "rgba(239,68,68,0.3)", color: "white", fontWeight: "700", cursor: confirmText === "CONFIRM" ? "pointer" : "not-allowed" }}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
