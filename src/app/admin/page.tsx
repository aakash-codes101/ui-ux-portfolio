"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, BedDouble,
  MessageSquare, AlertTriangle, LogOut, ChevronRight,
  Bell, Home, Menu, X,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useAdminData } from "@/lib/useAdminData";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminCreateStudent from "@/components/admin/AdminCreateStudent";
import AdminRooms from "@/components/admin/AdminRooms";
import AdminForms from "@/components/admin/AdminForms";
import AdminReports from "@/components/admin/AdminReports";

export type AdminTab = "overview" | "students" | "create" | "rooms" | "forms" | "reports";

const NAV = [
  { id: "overview" as AdminTab, icon: <LayoutDashboard size={18} />, label: "Dashboard", badge: null, color: "#7c3aed" },
  { id: "students" as AdminTab, icon: <Users size={18} />, label: "All Students", badge: null, color: "#2563eb" },
  { id: "create" as AdminTab, icon: <UserPlus size={18} />, label: "Add Student", badge: null, color: "#059669" },
  { id: "rooms" as AdminTab, icon: <BedDouble size={18} />, label: "Room Assignment", badge: null, color: "#0891b2" },
  { id: "forms" as AdminTab, icon: <MessageSquare size={18} />, label: "Form Entries", badge: null, color: "#d97706" },
  { id: "reports" as AdminTab, icon: <AlertTriangle size={18} />, label: "Reports & Problems", badge: null, color: "#dc2626" },
];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const adminData = useAdminData();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Build dynamic badges
  const navWithBadges = NAV.map((n) => {
    if (n.id === "forms") return { ...n, badge: adminData.inquiries.filter(i => i.status === "New").length || null };
    if (n.id === "reports") return { ...n, badge: adminData.reports.filter(r => r.status === "Open").length || null };
    if (n.id === "students") return { ...n, badge: adminData.students.length || null };
    return n;
  });

  if (adminData.loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080d1a" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", border: "3px solid rgba(124,58,237,0.2)", borderTop: "3px solid #7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#64748b" }}>Loading admin panel…</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    router.push("/admin/login");
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080d1a", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "260px", flexShrink: 0,
        background: "linear-gradient(180deg, #0d1117 0%, #0a0f1e 100%)",
        borderRight: "1px solid rgba(124,58,237,0.12)",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, bottom: 0, left: 0,
        zIndex: 300,
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      }} className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "42px", height: "42px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              borderRadius: "12px", display: "flex", alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(124,58,237,0.4)",
            }}>
              <Home size={20} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: "800", color: "#f1f5f9", fontSize: "1rem" }}>
                HMR <span style={{ color: "#a78bfa" }}>Admin</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: "#475569" }}>Warden Control Panel</div>
            </div>
          </div>
        </div>

        {/* Admin avatar */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "800", color: "white", fontSize: "0.8rem", flexShrink: 0,
            }}>
              {user.avatar}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</p>
              <p style={{ fontSize: "0.7rem", color: "#7c3aed", fontWeight: "600" }}>● Online — Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.75rem", overflowY: "auto" }}>
          <p style={{ fontSize: "0.65rem", color: "#334155", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.5rem 0.75rem", marginBottom: "0.25rem" }}>Navigation</p>
          {navWithBadges.map((item) => {
            const active = tab === item.id;
            return (
              <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1rem", borderRadius: "10px", border: "none",
                background: active ? `${item.color}18` : "transparent",
                color: active ? item.color : "#64748b",
                fontSize: "0.875rem", fontWeight: active ? "700" : "500",
                textAlign: "left", cursor: "pointer", marginBottom: "2px",
                transition: "all 0.2s",
                borderLeft: active ? `3px solid ${item.color}` : "3px solid transparent",
              }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}
              >
                <span style={{ color: active ? item.color : "#475569" }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge ? (
                  <span style={{
                    background: item.color, color: "white",
                    padding: "2px 7px", borderRadius: "99px",
                    fontSize: "0.65rem", fontWeight: "800",
                    minWidth: "20px", textAlign: "center",
                  }}>{item.badge}</span>
                ) : active ? <ChevronRight size={14} /> : null}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.625rem 1rem", borderRadius: "10px",
            color: "#475569", fontSize: "0.85rem", textDecoration: "none",
            transition: "all 0.2s", marginBottom: "4px",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; }}
          >
            <Home size={16} /> View Main Site
          </Link>
          <button onClick={() => { logout(); window.location.href = "/admin/login"; }} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.625rem 1rem", borderRadius: "10px", border: "none",
            background: "rgba(239,68,68,0.07)", color: "#ef4444",
            fontSize: "0.85rem", fontWeight: "500", cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.14)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.07)")}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 299,
          }}
        />
      )}

      {/* ── MAIN ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, marginLeft: "260px" }} className="admin-main">
        {/* Topbar */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(13,17,23,0.8)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 10,
          gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
            {/* Mobile hamburger */}
            <button
              className="admin-ham"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "8px",
                padding: "7px",
                cursor: "pointer",
                color: "#a78bfa",
                flexShrink: 0,
              }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {navWithBadges.find(n => n.id === tab)?.label}
              </h1>
              <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "2px" }} className="admin-date">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              position: "relative",
              width: "36px", height: "36px", borderRadius: "10px",
              background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <Bell size={16} color="#a78bfa" />
              {(adminData.reports.filter(r => r.status === "Open").length + adminData.inquiries.filter(i => i.status === "New").length) > 0 && (
                <span style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  background: "#dc2626", borderRadius: "50%",
                  width: "16px", height: "16px",
                  fontSize: "0.6rem", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "800",
                }}>
                  {adminData.reports.filter(r => r.status === "Open").length + adminData.inquiries.filter(i => i.status === "New").length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }} className="admin-content">
          {tab === "overview" && <AdminOverview data={adminData} setTab={setTab} />}
          {tab === "students" && <AdminStudents data={adminData} />}
          {tab === "create" && <AdminCreateStudent data={adminData} onSuccess={() => setTab("students")} />}
          {tab === "rooms" && <AdminRooms data={adminData} />}
          {tab === "forms" && <AdminForms data={adminData} />}
          {tab === "reports" && <AdminReports data={adminData} />}
        </div>
      </main>

      <style>{`
        /* ===== ADMIN MOBILE RESPONSIVE ===== */
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%);
            box-shadow: none;
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 40px rgba(0,0,0,0.7);
          }
          .admin-main { margin-left: 0 !important; }
          .admin-ham { display: flex !important; }
        }
        @media (max-width: 600px) {
          .admin-content { padding: 1rem !important; }
          .admin-date { display: none; }
        }
        @media (max-width: 480px) {
          .admin-sidebar { width: 80vw; max-width: 300px; }
        }
      `}</style>
    </div>
  );
}
