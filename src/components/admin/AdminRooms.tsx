"use client";
import React, { useState } from "react";
import { BedDouble, CheckCircle2 } from "lucide-react";
import { AddedStudent } from "@/lib/useAdminData";

interface Props {
  data: ReturnType<typeof import("@/lib/useAdminData").useAdminData>;
}

export default function AdminRooms({ data }: Props) {
  const { students, assignRoom } = data;
  const [assignTarget, setAssignTarget] = useState<AddedStudent | null>(null);
  const [roomNum, setRoomNum] = useState("");
  const [roomBlock, setRoomBlock] = useState("A");
  const [roomFloor, setRoomFloor] = useState("Ground Floor");
  const [saved, setSaved] = useState<string | null>(null);

  const unassigned = students.filter(s => !s.roomAssigned);
  const assigned = students.filter(s => s.roomAssigned);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNum.trim() || !assignTarget) return;
    const fullRoom = `${roomBlock}-${roomNum}`;
    assignRoom(assignTarget.id, fullRoom, roomBlock, roomFloor);
    setSaved(`Room ${fullRoom} assigned to ${assignTarget.name}`);
    setAssignTarget(null);
    setRoomNum(""); setRoomBlock("A"); setRoomFloor("Ground Floor");
    setTimeout(() => setSaved(null), 3000);
  };



  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f1f5f9" }}>Room Assignment</h2>
        <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.2rem" }}>Assign room numbers to students and view current allocations.</p>
      </div>

      {saved && (
        <div style={{ background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: "12px", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", color: "#10b981", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <CheckCircle2 size={16} /> {saved}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { l: "Total Students", v: students.length, c: "#7c3aed" },
          { l: "Rooms Assigned", v: assigned.length, c: "#10b981" },
          { l: "Pending Assignment", v: unassigned.length, c: "#f59e0b" },
        ].map((s) => (
          <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.7rem", color: "#475569", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>{s.l}</p>
            <p style={{ fontSize: "1.8rem", fontWeight: "800", color: s.c }}>{s.v}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Unassigned */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.95rem", flex: 1 }}>Pending Assignment</h3>
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", padding: "2px 8px", borderRadius: "99px", fontSize: "0.72rem", fontWeight: "700" }}>{unassigned.length}</span>
          </div>
          {unassigned.length === 0 ? (
            <div style={{ padding: "2.5rem", textAlign: "center", color: "#475569" }}>
              <CheckCircle2 size={30} style={{ display: "block", margin: "0 auto 0.75rem", color: "#10b981" }} />
              <p style={{ fontSize: "0.875rem" }}>All students have rooms assigned!</p>
            </div>
          ) : unassigned.map((s) => (
            <div key={s.id} style={{
              padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#f59e0b", fontSize: "0.75rem", flexShrink: 0 }}>{s.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</p>
                <p style={{ fontSize: "0.72rem", color: "#475569" }}>{s.roomType}</p>
              </div>
              <button
                onClick={() => { setAssignTarget(s); setRoomNum(""); }}
                style={{
                  padding: "5px 12px", borderRadius: "8px", border: "none",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "white", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "4px",
                }}
              >
                <BedDouble size={12} /> Assign
              </button>
            </div>
          ))}
        </div>

        {/* Assigned rooms */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h3 style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "0.95rem", flex: 1 }}>Assigned Rooms</h3>
            <span style={{ background: "rgba(5,150,105,0.12)", color: "#10b981", padding: "2px 8px", borderRadius: "99px", fontSize: "0.72rem", fontWeight: "700" }}>{assigned.length}</span>
          </div>
          {assigned.length === 0 ? (
            <div style={{ padding: "2.5rem", textAlign: "center", color: "#475569", fontSize: "0.875rem" }}>No rooms assigned yet.</div>
          ) : assigned.map((s) => (
            <div key={s.id} style={{
              padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(5,150,105,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "#10b981", fontSize: "0.75rem", flexShrink: 0 }}>{s.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "600", color: "#e2e8f0", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</p>
                <p style={{ fontSize: "0.72rem", color: "#475569" }}>{s.floor}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: "800", color: "#22d3ee", fontSize: "0.95rem" }}>{s.roomNumber}</p>
                <button onClick={() => { setAssignTarget(s); setRoomNum(""); }} style={{ background: "none", border: "none", color: "#64748b", fontSize: "0.7rem", cursor: "pointer", textDecoration: "underline", padding: 0 }}>Change</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign modal */}
      {assignTarget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }} onClick={() => setAssignTarget(null)} />
          <div style={{ position: "relative", zIndex: 1, background: "#0d1117", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "20px", padding: "2rem", width: "100%", maxWidth: "440px" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ width: "52px", height: "52px", background: "rgba(124,58,237,0.15)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <BedDouble size={26} color="#a78bfa" />
              </div>
              <h3 style={{ fontWeight: "700", color: "#f1f5f9", marginBottom: "0.3rem" }}>Assign Room</h3>
              <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Student: <strong style={{ color: "#a78bfa" }}>{assignTarget.name}</strong> · {assignTarget.roomType}</p>
            </div>
            <form onSubmit={handleAssign} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>Block</label>
                  <select className="input-field" value={roomBlock} onChange={(e) => setRoomBlock(e.target.value)} style={{ colorScheme: "dark", background: "rgba(0,0,0,0.3)" }}>
                    {["A", "B", "C", "D"].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>Room Number</label>
                  <input className="input-field" value={roomNum} onChange={(e) => setRoomNum(e.target.value)} placeholder="e.g. 101" required style={{ background: "rgba(0,0,0,0.3)" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>Floor</label>
                <select className="input-field" value={roomFloor} onChange={(e) => setRoomFloor(e.target.value)} style={{ colorScheme: "dark", background: "rgba(0,0,0,0.3)" }}>
                  {["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              {roomNum && (
                <div style={{ padding: "0.875rem", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "10px", textAlign: "center" }}>
                  <p style={{ fontSize: "0.8rem", color: "#7c6aad" }}>Room will be assigned as</p>
                  <p style={{ fontSize: "1.4rem", fontWeight: "800", color: "#a78bfa" }}>{roomBlock}-{roomNum}</p>
                  <p style={{ fontSize: "0.75rem", color: "#475569" }}>{roomFloor}, Block {roomBlock}</p>
                </div>
              )}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="button" onClick={() => setAssignTarget(null)} style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "0.75rem", borderRadius: "12px", border: "none", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "white", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <BedDouble size={15} /> Assign Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
