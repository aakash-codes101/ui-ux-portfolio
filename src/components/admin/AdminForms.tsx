"use client";
import React, { useState } from "react";
import { CheckCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { Inquiry } from "@/lib/useAdminData";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
}

const STATUS_COLORS: Record<Inquiry["status"], { bg: string; color: string; border: string }> = {
  New: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  Contacted: { bg: "rgba(8,145,178,0.12)", color: "#22d3ee", border: "rgba(8,145,178,0.25)" },
  Resolved: { bg: "rgba(5,150,105,0.12)", color: "#10b981", border: "rgba(5,150,105,0.25)" },
};

export default function AdminForms({ data }: Props) {
  const { inquiries, updateInquiryStatus } = data;
  const [filter, setFilter] = useState<"All" | Inquiry["status"]>("All");

  const filtered = filter === "All" ? inquiries : inquiries.filter(i => i.status === filter);
  const counts = {
    All: inquiries.length,
    New: inquiries.filter(i => i.status === "New").length,
    Contacted: inquiries.filter(i => i.status === "Contacted").length,
    Resolved: inquiries.filter(i => i.status === "Resolved").length,
  };

  const th: React.CSSProperties = { padding: "0.875rem 1.25rem", color: "#475569", fontWeight: "700", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" };
  const td: React.CSSProperties = { padding: "1rem 1.25rem", verticalAlign: "middle" };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9" }}>Form Entries</h2>
        <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.2rem" }}>Booking inquiries submitted by prospective students from the homepage.</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {(["All", "New", "Contacted", "Resolved"] as const).map((f) => {
          const active = filter === f;
          const c = f === "All" ? "#7c3aed" : STATUS_COLORS[f as Inquiry["status"]].color;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "0.5rem 1rem", borderRadius: "10px", border: "none",
              background: active ? `${c}18` : "rgba(255,255,255,0.04)",
              color: active ? c : "#64748b",
              fontWeight: active ? "700" : "500", fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "0.5rem",
              borderLeft: active ? `3px solid ${c}` : "3px solid transparent",
            }}>
              {f}
              <span style={{ background: active ? c : "rgba(255,255,255,0.08)", color: active ? "white" : "#475569", padding: "1px 7px", borderRadius: "99px", fontSize: "0.68rem", fontWeight: "800" }}>
                {counts[f]}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.2)" }}>
                <th style={th}>Date</th>
                <th style={th}>Applicant</th>
                <th style={th}>Room Pref.</th>
                <th style={th}>Stay Period</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "#475569" }}>
                    <MessageSquare size={32} style={{ display: "block", margin: "0 auto 0.75rem", opacity: 0.3 }} />
                    {filter === "All" ? "No inquiries received yet." : `No ${filter} inquiries.`}
                  </td>
                </tr>
              ) : filtered.map((inq) => {
                const sc = STATUS_COLORS[inq.status];
                return (
                  <tr key={inq.id} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={td}><span style={{ color: "#64748b", fontSize: "0.82rem" }}>{new Date(inq.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></td>
                    <td style={td}>
                      <div style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.875rem" }}>{inq.fullName}</div>
                      <div style={{ fontSize: "0.72rem", color: "#475569" }}>{inq.email}</div>
                      <div style={{ fontSize: "0.72rem", color: "#475569" }}>{inq.phone}</div>
                    </td>
                    <td style={td}><span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{inq.roomType}</span></td>
                    <td style={td}>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>IN: <span style={{ color: "#94a3b8" }}>{inq.checkIn}</span></div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>OUT: <span style={{ color: "#94a3b8" }}>{inq.checkOut}</span></div>
                    </td>
                    <td style={td}>
                      <span style={{ padding: "4px 10px", borderRadius: "8px", fontSize: "0.72rem", fontWeight: "700", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                        {inq.status}
                      </span>
                    </td>
                    <td style={td}>
                      {inq.status === "New" && (
                        <button onClick={() => updateInquiryStatus(inq.id, "Contacted")} style={{ padding: "5px 12px", borderRadius: "8px", border: "1px solid rgba(8,145,178,0.3)", background: "rgba(8,145,178,0.1)", color: "#22d3ee", cursor: "pointer", fontSize: "0.78rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                          <CheckCircle size={12} /> Mark Contacted
                        </button>
                      )}
                      {inq.status === "Contacted" && (
                        <button onClick={() => updateInquiryStatus(inq.id, "Resolved")} style={{ padding: "5px 12px", borderRadius: "8px", border: "1px solid rgba(5,150,105,0.3)", background: "rgba(5,150,105,0.1)", color: "#10b981", cursor: "pointer", fontSize: "0.78rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                          <CheckCircle2 size={12} /> Mark Resolved
                        </button>
                      )}
                      {inq.status === "Resolved" && (
                        <span style={{ color: "#475569", fontSize: "0.78rem" }}>✓ Done</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
