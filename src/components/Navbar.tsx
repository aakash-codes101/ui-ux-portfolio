"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { mockNotifications } from "@/lib/mockData";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  const unreadCount = mockNotifications.filter((n) => n.type === "warning").length;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: isScrolled
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(15, 23, 42, 0.2)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(4px)",
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
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
              width: "38px",
              height: "38px",
              background: "linear-gradient(135deg, #2563eb, #0d9488)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: "800",
              color: "white",
              flexShrink: 0,
            }}
          >
            HMR
          </div>
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}
          >
            HMR <span style={{ color: "#60a5fa" }}>Boys Hostel</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <NavLink href="/" icon={<Home size={15} />} label="Home" />
          <NavLink href="/#features" icon={null} label="Amenities" isAnchor />
          <NavLink href="/#rooms" icon={null} label="Rooms" isAnchor />
          {user && (
            <NavLink href="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" />
          )}
        </div>

        {/* Right side actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {user ? (
            <>
              {/* Notifications */}
              <div style={{ position: "relative" }}>
                <button
                  id="notif-btn"
                  onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "8px",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    transition: "all 0.2s",
                  }}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "9999px",
                        width: "16px",
                        height: "16px",
                        fontSize: "10px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div
                    className="glass animate-fade-in"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: "320px",
                      borderRadius: "16px",
                      padding: "1rem",
                      zIndex: 999,
                    }}
                  >
                    <p style={{ fontWeight: "600", fontSize: "0.875rem", marginBottom: "0.75rem", color: "#f1f5f9" }}>
                      Notifications
                    </p>
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: "0.625rem",
                          borderRadius: "8px",
                          marginBottom: "0.5rem",
                          background: n.type === "warning" ? "rgba(245,158,11,0.08)" : n.type === "success" ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${n.type === "warning" ? "rgba(245,158,11,0.2)" : n.type === "success" ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        <p style={{ fontSize: "0.8rem", fontWeight: "600", color: "#f1f5f9" }}>{n.title}</p>
                        <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>{n.message}</p>
                        <p style={{ fontSize: "0.7rem", color: "#475569", marginTop: "4px" }}>{n.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User menu */}
              <div style={{ position: "relative" }}>
                <button
                  id="user-menu-btn"
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "linear-gradient(135deg, #2563eb, #0d9488)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    {user.avatar}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "#f1f5f9", fontWeight: "500" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} color="#94a3b8" />
                </button>

                {userMenuOpen && (
                  <div
                    className="glass animate-fade-in"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 8px)",
                      width: "200px",
                      borderRadius: "14px",
                      padding: "0.5rem",
                      zIndex: 999,
                    }}
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.625rem 0.875rem",
                        borderRadius: "8px",
                        color: "#cbd5e1",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <User size={15} /> My Dashboard
                    </Link>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "0.25rem 0" }} />
                    <button
                      onClick={handleLogout}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.625rem 0.875rem",
                        borderRadius: "8px",
                        color: "#f87171",
                        fontSize: "0.875rem",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="btn-primary"
                id="nav-login-btn"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
              >
                <LogIn size={15} /> Login
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px",
              cursor: "pointer",
              color: "#94a3b8",
              display: "none",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="glass animate-fade-in"
          style={{
            margin: "0 1rem 1rem",
            borderRadius: "16px",
            padding: "1rem",
          }}
        >
          <MobileNavLink href="/" label="🏠 Home" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/#features" label="⭐ Amenities" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/#rooms" label="🛏 Rooms" onClick={() => setMenuOpen(false)} />
          {user ? (
            <>
              <MobileNavLink href="/dashboard" label="📊 Dashboard" onClick={() => setMenuOpen(false)} />
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                }}
              >
                🚪 Sign Out
              </button>
            </>
          ) : (
            <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link
                href="/auth"
                className="btn-primary"
                onClick={() => setMenuOpen(false)}
                style={{ justifyContent: "center" }}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          #nav-login-btn, #nav-signup-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({
  href,
  icon,
  label,
  isAnchor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isAnchor?: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={!isAnchor}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.5rem 0.875rem",
        borderRadius: "8px",
        color: "#94a3b8",
        textDecoration: "none",
        fontSize: "0.875rem",
        fontWeight: "500",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#f1f5f9";
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#94a3b8";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "0.75rem 1rem",
        borderRadius: "10px",
        color: "#cbd5e1",
        textDecoration: "none",
        fontSize: "0.9rem",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </Link>
  );
}
