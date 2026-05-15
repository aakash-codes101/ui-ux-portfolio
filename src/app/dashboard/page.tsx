"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Bell,
  LogOut,
  Home,
  BedDouble,
  Calendar,
  IndianRupee,
  AlertCircle,
  Clock,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { mockFees, mockBookings, FeeItem, Booking } from "@/lib/mockData";
import { useStudentData, ReportCategory, ReportPriority } from "@/lib/useStudentData";

type Section = "overview" | "fees" | "bookings" | "profile" | "reports";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingFees = mockFees.filter((f) => f.status === "pending" || f.status === "overdue");
  const pendingTotal = pendingFees.reduce((sum, f) => sum + f.amount, 0);
  const paidFees = mockFees.filter((f) => f.status === "paid");
  const paidTotal = paidFees.reduce((sum, f) => sum + f.amount, 0);
  const nextDueDate = pendingFees[0]?.dueDate;
  
  const daysUntilDue = useMemo(() => {
    return nextDueDate
      ? Math.ceil(
          // eslint-disable-next-line react-hooks/purity
          (new Date(nextDueDate).getTime() - Date.now()) / 86400000
        )
      : null;
  }, [nextDueDate]);

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth");
    if (!isLoading && user?.role === "admin") router.push("/admin");
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(37,99,235,0.2)",
            borderTop: "3px solid #2563eb",
            borderRadius: "9999px",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Loading your dashboard…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const navItems: { section: Section; icon: React.ReactNode; label: string }[] = [
    { section: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
    { section: "fees", icon: <CreditCard size={18} />, label: "Fee Tracker" },
    { section: "bookings", icon: <Calendar size={18} />, label: "My Bookings" },
    { section: "reports", icon: <AlertCircle size={18} />, label: "Report Issue" },
    { section: "profile", icon: <User size={18} />, label: "My Profile" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* === SIDEBAR === */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          background: "rgba(15,23,42,0.98)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 200,
          transition: "transform 0.3s ease",
        }}
        className={`sidebar${sidebarOpen ? " open" : ""}`}
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #2563eb, #0d9488)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                color: "white",
                fontSize: "1.1rem",
              }}
            >
              HMR
            </div>
            <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "#f1f5f9" }}>
              HMR <span style={{ color: "#60a5fa" }}>Boys Hostel</span>
            </span>
          </Link>
        </div>

        {/* User mini-profile */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #2563eb, #0d9488)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                color: "white",
                fontSize: "0.9rem",
                flexShrink: 0,
              }}
            >
              {user.avatar}
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontWeight: "600",
                  color: "#f1f5f9",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user.name}
              </p>
              <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{user.studentId}</p>
            </div>
          </div>
          <div
            style={{
              marginTop: "0.75rem",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "8px",
              padding: "0.5rem 0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <BedDouble size={14} color="#22c55e" />
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Room <strong style={{ color: "#f1f5f9" }}>{user.roomNumber}</strong> · {user.roomType}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
          {navItems.map((item) => (
            <button
              key={item.section}
              id={`nav-${item.section}`}
              onClick={() => { setActiveSection(item.section); setSidebarOpen(false); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                marginBottom: "0.25rem",
                background:
                  activeSection === item.section
                    ? "rgba(37,99,235,0.15)"
                    : "transparent",
                color: activeSection === item.section ? "#60a5fa" : "#64748b",
                fontWeight: activeSection === item.section ? "600" : "500",
                fontSize: "0.875rem",
                transition: "all 0.2s",
                textAlign: "left",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.section) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#94a3b8";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.section) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              {item.icon}
              {item.label}
              {item.section === "fees" && pendingTotal > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    width: "8px",
                    height: "8px",
                    background: "#f59e0b",
                    borderRadius: "9999px",
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => { logout(); router.push("/"); }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "rgba(239,68,68,0.08)",
              color: "#f87171",
              fontSize: "0.875rem",
              fontWeight: "500",
              transition: "all 0.2s",
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 199,
          }}
        />
      )}

      {/* === MAIN CONTENT === */}
      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        className="dash-main"
      >
        {/* Top bar */}
        <header
          style={{
            height: "68px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Mobile hamburger */}
            <button
              className="mobile-ham"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "7px",
                cursor: "pointer",
                color: "#94a3b8",
                display: "none",
              }}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#f1f5f9" }}>
                {navItems.find((n) => n.section === activeSection)?.label}
              </h2>
              <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Welcome back, {user.name.split(" ")[0]} 👋
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8rem",
                color: "#64748b",
                textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "6px 12px",
                transition: "all 0.2s",
              }}
            >
              <Home size={14} /> Main Site
            </Link>
          </div>
        </header>

        {/* Content area */}
        <main style={{ padding: "2rem", flex: 1 }}>
          {activeSection === "overview" && (
            <OverviewSection
              user={user}
              pendingTotal={pendingTotal}
              paidTotal={paidTotal}
              nextDueDate={nextDueDate}
              daysUntilDue={daysUntilDue}
              pendingFees={pendingFees}
              onGoFees={() => setActiveSection("fees")}
            />
          )}
          {activeSection === "fees" && (
            <FeesSection
              fees={mockFees}
              pendingTotal={pendingTotal}
              nextDueDate={nextDueDate}
            />
          )}
          {activeSection === "bookings" && <BookingsSection bookings={mockBookings} />}
          {activeSection === "reports" && <ReportSection user={user} />}
          {activeSection === "profile" && <ProfileSection user={user} />}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .dash-main { margin-left: 0 !important; }
          .mobile-ham { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

// ... existing components ...

// =====================
// REPORT ISSUE
// =====================
function ReportSection({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  const { submitReport } = useStudentData();
  const [form, setForm] = useState({
    category: "Maintenance" as ReportCategory,
    title: "",
    description: "",
    priority: "Medium" as ReportPriority,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    
    setLoading(true);
    try {
      await submitReport({
        studentId: user.studentId,
        studentName: user.name,
        roomNumber: user.roomNumber,
        ...form
      });
      setSubmitted(true);
      setForm({ category: "Maintenance", title: "", description: "", priority: "Medium" });
    } catch (err) {
      console.error("Failed to submit report", err);
      alert("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "640px" }}>
      <div className="glass" style={{ borderRadius: "20px", padding: "2rem" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: "64px", height: "64px", background: "rgba(34,197,94,0.15)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircle2 size={32} color="#22c55e" />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.5rem" }}>Report Submitted!</h3>
            <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>The admin has been notified and will resolve your issue shortly.</p>
            <button className="btn-outline" onClick={() => setSubmitted(false)}>Submit Another Issue</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f1f5f9", marginBottom: "0.5rem" }}>Report an Issue</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "2rem" }}>
              Is something broken? Or have a complaint? Let us know and we'll fix it.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <div>
                  <label style={labelSt}>Category</label>
                  <select 
                    className="input-field" 
                    style={{ appearance: "none", colorScheme: "dark" }}
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value as ReportCategory})}
                  >
                    <option value="Maintenance">Maintenance (Fan, Light, Water)</option>
                    <option value="Complaint">General Complaint</option>
                    <option value="Request">Special Request</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelSt}>Title / Subject</label>
                  <input 
                    className="input-field" 
                    placeholder="e.g. Bathroom tap leaking"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label style={labelSt}>Description</label>
                  <textarea 
                    className="input-field" 
                    placeholder="Please provide details..."
                    style={{ minHeight: "120px", resize: "vertical", padding: "0.75rem 1rem" }}
                    value={form.description}
                    onChange={e => setForm({...form, description: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label style={labelSt}>Priority</label>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {(["Low", "Medium", "High", "Critical"] as ReportPriority[]).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm({...form, priority: p})}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          border: "1px solid",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          background: form.priority === p ? "rgba(37,99,235,0.15)" : "transparent",
                          borderColor: form.priority === p ? "#2563eb" : "rgba(255,255,255,0.1)",
                          color: form.priority === p ? "#60a5fa" : "#64748b"
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
                >
                  {loading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// =====================
// OVERVIEW
// =====================
function OverviewSection({
  user,
  pendingTotal,
  paidTotal,
  nextDueDate,
  daysUntilDue,
  pendingFees,
  onGoFees,
}: {
  user: ReturnType<typeof useAuth>["user"];
  pendingTotal: number;
  paidTotal: number;
  nextDueDate?: string;
  daysUntilDue: number | null;
  pendingFees: FeeItem[];
  onGoFees: () => void;
}) {
  if (!user) return null;

  return (
    <div className="animate-fade-in">
      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <StatCard
          icon={<IndianRupee size={20} />}
          iconBg="rgba(239,68,68,0.15)"
          iconColor="#f87171"
          label="Total Pending"
          value={`₹${pendingTotal.toLocaleString("en-IN")}`}
          sub={daysUntilDue !== null ? `Due in ${daysUntilDue} days` : ""}
          subColor={daysUntilDue !== null && daysUntilDue <= 5 ? "#f87171" : "#f59e0b"}
        />
        <StatCard
          icon={<CheckCircle2 size={20} />}
          iconBg="rgba(34,197,94,0.15)"
          iconColor="#22c55e"
          label="Total Paid (This Year)"
          value={`₹${paidTotal.toLocaleString("en-IN")}`}
          sub="All cleared ✓"
          subColor="#22c55e"
        />
        <StatCard
          icon={<BedDouble size={20} />}
          iconBg="rgba(37,99,235,0.15)"
          iconColor="#60a5fa"
          label="Room Assignment"
          value={user.roomNumber}
          sub={user.floor}
          subColor="#64748b"
        />
        <StatCard
          icon={<Clock size={20} />}
          iconBg="rgba(245,158,11,0.15)"
          iconColor="#f59e0b"
          label="Next Due Date"
          value={nextDueDate ? new Date(nextDueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
          sub={daysUntilDue !== null ? `${daysUntilDue} days remaining` : ""}
          subColor="#64748b"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="overview-lower-grid">
        {/* Fee summary card */}
        <div className="glass" style={{ borderRadius: "20px", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1rem" }}>
              Current Pending Fees
            </h3>
            <button
              onClick={onGoFees}
              style={{
                background: "none",
                border: "none",
                color: "#60a5fa",
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          {pendingFees.slice(0, 4).map((fee) => (
            <div
              key={fee.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.625rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div>
                <p style={{ fontSize: "0.875rem", color: "#cbd5e1", fontWeight: "500" }}>{fee.label}</p>
                <p style={{ fontSize: "0.72rem", color: "#475569" }}>{fee.month}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "#f1f5f9" }}>
                  ₹{fee.amount.toLocaleString("en-IN")}
                </span>
                <span className={`badge badge-${fee.status}`}>{fee.status}</span>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: "1.25rem",
              padding: "1rem 1.25rem",
              background: "rgba(245,158,11,0.06)",
              borderRadius: "12px",
              border: "1px solid rgba(245,158,11,0.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Total Outstanding</p>
              <p style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f87171" }}>
                ₹{pendingTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "10px", padding: "0.6rem 1rem" }}>
              <IndianRupee size={15} color="#f59e0b" />
              <span style={{ fontSize: "0.8rem", color: "#f59e0b", fontWeight: "600" }}>Pay via UPI or Cash directly at the hostel</span>
            </div>
          </div>
        </div>

        {/* Profile summary card */}
        <div className="glass" style={{ borderRadius: "20px", padding: "1.5rem" }}>
          <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1rem", marginBottom: "1.25rem" }}>
            Profile Summary
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #2563eb, #0d9488)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                fontWeight: "800",
                color: "white",
                flexShrink: 0,
              }}
            >
              {user.avatar}
            </div>
            <div>
              <p style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1.05rem" }}>{user.name}</p>
              <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{user.studentId}</p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  borderRadius: "9999px",
                  padding: "2px 10px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  color: "#22c55e",
                  marginTop: "4px",
                }}
              >
                ✓ Active Resident
              </span>
            </div>
          </div>

          {[
            { icon: <Mail size={14} />, label: "Email", value: user.email },
            { icon: <Phone size={14} />, label: "Phone", value: user.phone },
            { icon: <BedDouble size={14} />, label: "Room", value: `${user.roomNumber} · ${user.roomType}` },
            { icon: <Home size={14} />, label: "Location", value: user.floor },
            { icon: <Calendar size={14} />, label: "Move-in", value: new Date(user.joinDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "0.5rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#2563eb", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.label}</p>
                <p style={{ fontSize: "0.875rem", color: "#cbd5e1", wordBreak: "break-all" }}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .overview-lower-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// =====================
// FEE TRACKER
// =====================
function FeesSection({
  fees,
  pendingTotal,
  nextDueDate,
}: {
  fees: FeeItem[];
  pendingTotal: number;
  nextDueDate?: string;
}) {

  return (
    <div className="animate-fade-in">
      {/* Fee Hero Banner */}
      <div
        className="glass"
        style={{
          borderRadius: "20px",
          padding: "1.75rem 2rem",
          background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,158,11,0.06))",
          border: "1px solid rgba(239,68,68,0.18)",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <AlertCircle size={24} color="#f59e0b" />
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1.05rem" }}>Outstanding Balance</h3>
          </div>
          <p style={{ fontSize: "2rem", fontWeight: "800", color: "#f1f5f9" }}>
            ₹{pendingTotal.toLocaleString("en-IN")}
          </p>
          {nextDueDate && (
            <p style={{ fontSize: "0.825rem", color: "#94a3b8", marginTop: "4px" }}>
              Due by{" "}
              <strong style={{ color: "#f59e0b" }}>
                {new Date(nextDueDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </p>
          )}
        </div>

        {/* Payment info — no online pay button */}
        <div style={{
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          maxWidth: "280px",
        }}>
          <p style={{ fontSize: "0.78rem", fontWeight: "700", color: "#f59e0b", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>How to Pay</p>
          <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.6 }}>
            Pay via <strong style={{ color: "#f1f5f9" }}>UPI or Cash</strong> directly to the hostel owner. Your balance will be updated by the admin once payment is received.
          </p>
        </div>
      </div>

      {/* Current month fees */}
      <div className="glass" style={{ borderRadius: "20px", marginBottom: "1.25rem", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1rem" }}>April 2026 — Breakdown</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                {["Description", "Month", "Amount", "Due Date", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.875rem 1.5rem",
                      textAlign: "left",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "#475569",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, i) => (
                <tr
                  key={fee.id}
                  style={{
                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#cbd5e1", fontWeight: "500" }}>
                    {fee.label}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
                    {fee.month}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", fontWeight: "700", color: "#f1f5f9" }}>
                    ₹{fee.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
                    {new Date(fee.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span className={`badge badge-${fee.status}`}>
                      {fee.status === "paid" ? "✓ Paid" : fee.status === "overdue" ? "⚠ Overdue" : "● Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment note */}
      <div
        className="glass"
        style={{
          borderRadius: "16px",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.825rem",
          color: "#64748b",
        }}
      >
        <IndianRupee size={16} color="#f59e0b" />
        <span>
          Payments are accepted via <strong style={{ color: "#94a3b8" }}>UPI or Cash</strong> directly at the hostel. Contact the warden once paid — your fee status will be updated by the admin.
        </span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// =====================
// BOOKINGS
// =====================
function BookingsSection({ bookings }: { bookings: Booking[] }) {
  const statusColor: Record<Booking["status"], { bg: string; color: string; label: string }> = {
    active: { bg: "rgba(34,197,94,0.1)", color: "#22c55e", label: "● Active" },
    upcoming: { bg: "rgba(37,99,235,0.1)", color: "#60a5fa", label: "↑ Upcoming" },
    completed: { bg: "rgba(100,116,139,0.1)", color: "#64748b", label: "✓ Completed" },
  };

  return (
    <div className="animate-fade-in">
      <div className="glass" style={{ borderRadius: "20px", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "1rem" }}>Booking History</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                {["Booking ID", "Room Type", "Room No.", "Check-In", "Check-Out", "Monthly Rent", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.72rem",
                        fontWeight: "700",
                        color: "#475569",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr
                  key={b.id}
                  style={{
                    borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.825rem", color: "#60a5fa", fontFamily: "monospace" }}>
                    {b.id}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#cbd5e1" }}>{b.roomType}</td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", fontWeight: "700", color: "#f1f5f9" }}>{b.roomNumber}</td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
                    {new Date(b.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "#64748b" }}>
                    {new Date(b.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", fontWeight: "700", color: "#f1f5f9" }}>
                    ₹{b.amount.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "0.72rem",
                        fontWeight: "700",
                        background: statusColor[b.status].bg,
                        color: statusColor[b.status].color,
                        border: `1px solid ${statusColor[b.status].color}40`,
                      }}
                    >
                      {statusColor[b.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// =====================
// PROFILE
// =====================
function ProfileSection({ user }: { user: NonNullable<ReturnType<typeof useAuth>["user"]> }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  return (
    <div className="animate-fade-in" style={{ maxWidth: "640px" }}>
      <div className="glass" style={{ borderRadius: "20px", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(13,148,136,0.15))",
            padding: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, #2563eb, #0d9488)",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "white",
              flexShrink: 0,
            }}
          >
            {user.avatar}
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f1f5f9" }}>{user.name}</h2>
            <p style={{ fontSize: "0.825rem", color: "#94a3b8" }}>{user.studentId}</p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "6px",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "9999px",
                padding: "2px 10px",
                fontSize: "0.72rem",
                fontWeight: "700",
                color: "#22c55e",
              }}
            >
              ✓ Verified Resident
            </span>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="btn-outline"
            style={{ marginLeft: "auto", padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            {editing ? "Cancel" : "✏️ Edit"}
          </button>
        </div>

        {/* Fields */}
        <div style={{ padding: "1.75rem 2rem" }}>
          {editing ? (
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelSt}>Full Name</label>
                <input
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelSt}>Phone</label>
                <input
                  className="input-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                className="btn-primary"
                onClick={() => setEditing(false)}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Full Name", value: name },
                { label: "Email Address", value: user.email },
                { label: "Phone Number", value: phone },
                { label: "Student ID", value: user.studentId },
                { label: "Room Number", value: user.roomNumber },
                { label: "Room Type", value: user.roomType },
                { label: "Floor / Block", value: user.floor },
                { label: "Move-in Date", value: new Date(user.joinDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#475569", flexShrink: 0 }}>{row.label}</span>
                  <span style={{ fontSize: "0.875rem", color: "#cbd5e1", fontWeight: "500", textAlign: "right" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================
// HELPERS
// =====================
function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  subColor,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
  subColor: string;
}) {
  return (
    <div
      className="glass glass-hover"
      style={{ borderRadius: "16px", padding: "1.25rem 1.5rem" }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: iconBg,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
          marginBottom: "0.875rem",
        }}
      >
        {icon}
      </div>
      <p style={{ fontSize: "0.72rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
        {label}
      </p>
      <p style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9", lineHeight: 1 }}>
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: "0.75rem", color: subColor, marginTop: "0.375rem" }}>{sub}</p>
      )}
    </div>
  );
}

const labelSt: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: "600",
  color: "#94a3b8",
  marginBottom: "0.375rem",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};
