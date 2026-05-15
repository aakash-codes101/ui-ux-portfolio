"use client";
import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, AlertOctagon } from "lucide-react";
import { Report } from "@/lib/useAdminData";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
}

const PRIO_COLORS: Record<Report["priority"], { bg: string; color: string }> = {
  Critical: { bg: "rgba(220,38,38,0.15)", color: "#ef4444" },
  High: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  Medium: { bg: "rgba(8,145,178,0.12)", color: "#22d3ee" },
  Low: { bg: "rgba(100,116,139,0.12)", color: "#94a3b8" },
};

const STATUS_COLORS: Record<Report["status"], { bg: string; color: string }> = {
  Open: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
  "In Progress": { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  Resolved: { bg: "rgba(5,150,105,0.12)", color: "#10b981" },
};

const CAT_ICONS: Record<Report["category"], React.ReactNode> = {
  Maintenance: "🔧",
  Complaint: "😤",
  Request: "📝",
  Emergency: "🚨",
  Other: "📌",
};

export default function AdminReports({ data }: Props) {
  const { reports, updateReportStatus } = data;
  const [filterStatus, setFilterStatus] = useState<"All" | Report["status"]>("All");
  const [filterPrio, setFilterPrio] = useState<"All" | Report["priority"]>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = reports.filter(r =>
    (filterStatus === "All" || r.status === filterStatus) &&
    (filterPrio === "All" || r.priority === filterPrio)
  );

  const counts = {
    Open: reports.filter(r => r.status === "Open").length,
    "In Progress": reports.filter(r => r.status === "In Progress").length,
    Resolved: reports.filter(r => r.status === "Resolved").length,
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9" }}>Reports & Problems</h2>
        <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.2rem" }}>Issues and requests raised by students from their dashboard.</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
        {[
          { l: "Open", v: counts["Open"], c: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: <AlertOctagon size={20} /> },
          { l: "In Progress", v: counts["In Progress"], c: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: <Clock size={20} /> },
          { l: "Resolved", v: counts["Resolved"], c: "#10b981", bg: "rgba(5,150,105,0.1)", icon: <CheckCircle2 size={20} /> },
        ].map((s) => (
          <div key={s.l} onClick={() => setFilterStatus(s.l as Report["status"])} style={{ background: filterStatus === s.l ? s.bg : "rgba(255,255,255,0.03)", border: `1px solid ${filterStatus === s.l ? s.c + "40" : "rgba(255,255,255,0.07)"}`, borderRadius: "14px", padding: "1.25rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ color: s.c }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: "0.7rem", color: "#475569", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</p>
              <p style={{ fontSize: "1.6rem", fontWeight: "800", color: s.c }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "All" | Report["status"])} className="input-field" style={{ width: "auto", colorScheme: "dark", background: "rgba(255,255,255,0.04)", fontSize: "0.85rem", padding: "0.5rem 0.875rem" }}>
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select value={filterPrio} onChange={(e) => setFilterPrio(e.target.value as "All" | Report["priority"])} className="input-field" style={{ width: "auto", colorScheme: "dark", background: "rgba(255,255,255,0.04)", fontSize: "0.85rem", padding: "0.5rem 0.875rem" }}>
          <option value="All">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <span style={{ color: "#475569", fontSize: "0.8rem" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        {(filterStatus !== "All" || filterPrio !== "All") && (
          <button onClick={() => { setFilterStatus("All"); setFilterPrio("All"); }} style={{ background: "none", border: "none", color: "#7c3aed", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}>Clear filters</button>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {filtered.length === 0 ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "3rem", textAlign: "center", color: "#475569" }}>
            <AlertTriangle size={32} style={{ display: "block", margin: "0 auto 0.75rem", opacity: 0.3 }} />
            <p>No reports match your filters.</p>
          </div>
        ) : filtered.map((r) => {
          const pc = PRIO_COLORS[r.priority];
          const sc = STATUS_COLORS[r.status];
          const isExpanded = expanded === r.id;
          return (
            <div key={r.id} style={{
              background: "rgba(255,255,255,0.03)",
              border: r.status === "Open" && r.priority === "Critical" ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px", overflow: "hidden", transition: "all 0.2s",
            }}>
              <div style={{
                padding: "1.25rem 1.5rem", cursor: "pointer",
                display: "flex", alignItems: "flex-start", gap: "1rem",
              }} onClick={() => setExpanded(isExpanded ? null : r.id)}>
                {/* Category icon */}
                <div style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: "2px" }}>{CAT_ICONS[r.category]}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                    <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.95rem" }}>{r.title}</h3>
                    <span style={{ fontSize: "0.68rem", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: pc.bg, color: pc.color }}>{r.priority}</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: "700", padding: "2px 8px", borderRadius: "6px", background: sc.bg, color: sc.color }}>{r.status}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#475569" }}>
                    <strong style={{ color: "#64748b" }}>{r.studentName}</strong> · Room {r.roomNumber} · {r.category} · {new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </div>

                <div style={{ color: "#475569", fontSize: "0.8rem", flexShrink: 0 }}>{isExpanded ? "▲" : "▼"}</div>
              </div>

              {isExpanded && (
                <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.15)" }}>
                  <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.7, marginBottom: "1.25rem" }}>{r.description}</p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {r.status === "Open" && (
                      <button onClick={() => updateReportStatus(r.id, "In Progress")} style={{ padding: "6px 14px", borderRadius: "9px", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.1)", color: "#f59e0b", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={13} /> Mark In Progress
                      </button>
                    )}
                    {r.status !== "Resolved" && (
                      <button onClick={() => updateReportStatus(r.id, "Resolved")} style={{ padding: "6px 14px", borderRadius: "9px", border: "1px solid rgba(5,150,105,0.3)", background: "rgba(5,150,105,0.1)", color: "#10b981", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
                        <CheckCircle2 size={13} /> Mark Resolved
                      </button>
                    )}
                    {r.status === "Resolved" && (
                      <button onClick={() => updateReportStatus(r.id, "Open")} style={{ padding: "6px 14px", borderRadius: "9px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.07)", color: "#f87171", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600" }}>
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
