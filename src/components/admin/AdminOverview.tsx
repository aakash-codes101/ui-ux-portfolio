"use client";
import React from "react";
import { Users, IndianRupee, BedDouble, AlertTriangle, MessageSquare, TrendingUp, UserPlus } from "lucide-react";
import { AdminTab } from "@/app/admin/page";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
  setTab: (t: AdminTab) => void;
}

export default function AdminOverview({ data, setTab }: Props) {
  const { students, inquiries, reports } = data;
  const totalRevenue = students.reduce((s, st) => s + st.yearlyFee, 0);
  const totalCollected = students.reduce((s, st) => s + st.feePaid, 0);
  const totalOutstanding = totalRevenue - totalCollected;
  const assignedRooms = students.filter(s => s.roomAssigned).length;
  const openReports = reports.filter(r => r.status === "Open").length;
  const newForms = inquiries.filter(i => i.status === "New").length;

  const stats = [
    { label: "Total Students", value: students.length, icon: <Users size={22} />, color: "#7c3aed", bg: "rgba(124,58,237,0.12)", action: () => setTab("students") },
    { label: "Revenue (Yearly)", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <IndianRupee size={22} />, color: "#059669", bg: "rgba(5,150,105,0.12)", action: () => setTab("students") },
    { label: "Collected", value: `₹${totalCollected.toLocaleString("en-IN")}`, icon: <TrendingUp size={22} />, color: "#0891b2", bg: "rgba(8,145,178,0.12)", action: () => setTab("students") },
    { label: "Outstanding", value: `₹${totalOutstanding.toLocaleString("en-IN")}`, icon: <IndianRupee size={22} />, color: "#dc2626", bg: "rgba(220,38,38,0.12)", action: () => setTab("students") },
    { label: "Rooms Assigned", value: `${assignedRooms}/${students.length}`, icon: <BedDouble size={22} />, color: "#d97706", bg: "rgba(217,119,6,0.12)", action: () => setTab("rooms") },
    { label: "Open Reports", value: openReports, icon: <AlertTriangle size={22} />, color: "#ef4444", bg: "rgba(239,68,68,0.12)", action: () => setTab("reports") },
    { label: "New Form Entries", value: newForms, icon: <MessageSquare size={22} />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", action: () => setTab("forms") },
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome */}
      <div style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.08) 100%)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: "20px", padding: "2rem", marginBottom: "2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#f1f5f9", marginBottom: "0.35rem" }}>
            Welcome back, Warden 👋
          </h2>
          <p style={{ color: "#7c6aad", fontSize: "0.9rem" }}>
            Here is a snapshot of HMR Boys Hostel today.
          </p>
        </div>
        <button onClick={() => setTab("create")} style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          color: "white", padding: "0.75rem 1.5rem",
          borderRadius: "12px", border: "none",
          fontWeight: "700", cursor: "pointer",
          boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
          fontSize: "0.9rem",
        }}>
          <UserPlus size={16} /> Add New Student
        </button>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {stats.map((s) => (
          <div key={s.label} onClick={s.action} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "1.25rem",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.border = `1px solid ${s.color}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: s.bg, color: s.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "0.875rem",
            }}>{s.icon}</div>
            <p style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>{s.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: "800", color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Recent students */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.95rem" }}>Recent Students</h3>
            <button onClick={() => setTab("students")} style={{ background: "none", border: "none", color: "#7c3aed", fontSize: "0.8rem", cursor: "pointer", fontWeight: "600" }}>View all →</button>
          </div>
          <div>
            {students.length === 0 ? (
              <p style={{ padding: "2rem", color: "#475569", textAlign: "center", fontSize: "0.875rem" }}>No students yet. Add one!</p>
            ) : students.slice(0, 4).map((s) => (
              <div key={s.id} style={{
                padding: "0.875rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#a78bfa", fontSize: "0.75rem", flexShrink: 0 }}>{s.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</p>
                  <p style={{ fontSize: "0.72rem", color: "#475569" }}>Room: {s.roomNumber || "TBD"}</p>
                </div>
                <span style={{
                  fontSize: "0.68rem", padding: "2px 8px", borderRadius: "6px", fontWeight: "700",
                  background: s.roomAssigned ? "rgba(5,150,105,0.12)" : "rgba(245,158,11,0.12)",
                  color: s.roomAssigned ? "#10b981" : "#f59e0b",
                }}>{s.roomAssigned ? "Assigned" : "Pending"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reports */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.95rem" }}>Recent Reports</h3>
            <button onClick={() => setTab("reports")} style={{ background: "none", border: "none", color: "#dc2626", fontSize: "0.8rem", cursor: "pointer", fontWeight: "600" }}>View all →</button>
          </div>
          <div>
            {reports.slice(0, 4).map((r) => {
              const prioColor = r.priority === "Critical" ? "#dc2626" : r.priority === "High" ? "#f59e0b" : r.priority === "Medium" ? "#0891b2" : "#64748b";
              return (
                <div key={r.id} style={{ padding: "0.875rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</p>
                      <p style={{ fontSize: "0.72rem", color: "#475569" }}>{r.studentName} · Room {r.roomNumber}</p>
                    </div>
                    <span style={{
                      fontSize: "0.65rem", padding: "2px 7px", borderRadius: "6px", fontWeight: "700",
                      background: `${prioColor}18`, color: prioColor, flexShrink: 0,
                    }}>{r.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
