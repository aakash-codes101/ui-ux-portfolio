"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoading || isLoginPage) return;
    if (!user) {
      router.push("/admin/login");
    } else if (user.role !== "admin") {
      router.push("/admin/login");
    }
  }, [user, isLoading, router, isLoginPage]);

  // Always show login page without blocking
  if (isLoginPage) return <>{children}</>;

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#080d1a",
      }}>
        <div>
          <div style={{
            width: "40px", height: "40px",
            border: "3px solid rgba(124,58,237,0.2)",
            borderTop: "3px solid #7c3aed",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return <div style={{ background: "#080d1a", minHeight: "100vh" }}>{children}</div>;
}
