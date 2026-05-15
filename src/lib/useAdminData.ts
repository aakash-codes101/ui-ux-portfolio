"use client";

import { useEffect, useState } from "react";
import { User } from "./authContext";
import { supabase } from "./supabase";

export type Inquiry = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  date: string;
  status: "New" | "Contacted" | "Resolved";
  message?: string;
};

export type Report = {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  category: "Maintenance" | "Complaint" | "Request" | "Emergency" | "Other";
  title: string;
  description: string;
  date: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High" | "Critical";
};

export type AddedStudent = User & {
  username: string;
  planType: "Monthly" | "Yearly";
  accommodationRate: number;
  yearlyFee: number;
  monthlyFee: number;
  paymentPlan: "One time (full year)" | "3 payments (every 4 months)" | "Monthly";
  admissionDate: string;
  password?: string;
  feePaid: number;
  roomNumber: string;
  roomBlock: string;
  roomFloor: string;
  roomAssigned: boolean;
  aadharNumber?: string;
};

export function useAdminData() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [students, setStudents] = useState<AddedStudent[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, stuRes, rptRes] = await Promise.all([
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
        supabase.from("students").select("*").order("created_at", { ascending: false }),
        supabase.from("reports").select("*").order("created_at", { ascending: false }),
      ]);

      if (inqRes.data) {
        setInquiries(inqRes.data.map(item => ({
          ...item,
          fullName: item.full_name,
          date: item.created_at
        })));
      }
      
      if (stuRes.data) {
        setStudents(stuRes.data.map(item => ({
          ...item,
          accommodationRate: Number(item.accommodation_rate),
          yearlyFee: Number(item.yearly_fee),
          monthlyFee: Number(item.monthly_fee),
          feePaid: Number(item.fee_paid),
          studentId: item.student_id,
          admissionDate: item.admission_date,
          joinDate: item.admission_date,
          floor: `${item.room_floor}, Block ${item.room_block}`
        })));
      }

      if (rptRes.data) {
        setReports(rptRes.data.map(item => ({
          ...item,
          studentId: item.student_id,
          studentName: item.student_name,
          roomNumber: item.room_number,
          date: item.created_at
        })));
      }
    } catch (err) {
      console.error("Failed to fetch data from Supabase", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }

    const channel = supabase
      .channel('admin_reports_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reports' },
        (payload) => {
          const newReport = payload.new;
          
          if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
            const notif = new Notification(`New ${newReport.category} Reported`, {
              body: `${newReport.student_name} (Room ${newReport.room_number}): ${newReport.title}`,
              icon: "/icon512_maskable.png"
            });
            notif.onclick = () => {
              window.focus();
            };
          }

          setReports(prev => [{
            id: newReport.id,
            studentId: newReport.student_id,
            studentName: newReport.student_name,
            roomNumber: newReport.room_number,
            category: newReport.category,
            title: newReport.title,
            description: newReport.description,
            date: newReport.created_at,
            status: newReport.status,
            priority: newReport.priority
          }, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateInquiryStatus = async (id: string, newStatus: Inquiry["status"]) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);
    
    if (!error) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
    }
  };

  const addStudent = async (studentData: {
    name: string;
    username: string;
    email: string;
    phone: string;
    roomType: string;
    accommodationRate: number;
    yearlyFee: number;
    monthlyFee: number;
    paymentPlan: AddedStudent["paymentPlan"];
    planType: AddedStudent["planType"];
    password: string;
    aadharNumber: string;
  }) => {
    const newStudent = {
      name: studentData.name,
      username: studentData.username,
      email: studentData.email,
      phone: studentData.phone,
      room_type: studentData.roomType,
      accommodation_rate: studentData.accommodationRate,
      yearly_fee: studentData.yearlyFee,
      monthly_fee: studentData.monthlyFee,
      payment_plan: studentData.paymentPlan,
      plan_type: studentData.planType,
      student_id: "STU-" + Math.floor(Math.random() * 90000 + 10000),
      avatar: studentData.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2),
      role: "student",
      room_assigned: false,
      fee_paid: 0,
      room_number: "TBD",
      password: studentData.password,
      aadhar_number: studentData.aadharNumber
    };

    const { data, error } = await supabase.from("students").insert([newStudent]).select();

    if (error) {
      console.error("Error adding student", error);
      throw error;
    }

    if (data && data[0]) {
      const created = {
        ...data[0],
        studentId: data[0].student_id,
        yearlyFee: Number(data[0].yearly_fee),
        monthlyFee: Number(data[0].monthly_fee),
        feePaid: Number(data[0].fee_paid),
        admissionDate: data[0].admission_date,
        joinDate: data[0].admission_date,
        floor: "Pending"
      };
      setStudents(prev => [created, ...prev]);
      return created;
    }
  };

  const deleteStudent = async (id: string) => {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (!error) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const markFeePaid = async (id: string, amount: number) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const newFeePaid = Math.min(student.feePaid + amount, student.yearlyFee);
    const { error } = await supabase
      .from("students")
      .update({ fee_paid: newFeePaid })
      .eq("id", id);

    if (!error) {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, feePaid: newFeePaid } : s));
    }
  };

  const assignRoom = async (id: string, roomNumber: string, roomBlock: string, roomFloor: string) => {
    const { error } = await supabase
      .from("students")
      .update({ 
        room_number: roomNumber, 
        room_block: roomBlock, 
        room_floor: roomFloor,
        room_assigned: true 
      })
      .eq("id", id);

    if (!error) {
      setStudents(prev => prev.map(s => s.id === id 
        ? { ...s, roomNumber, roomBlock, roomFloor, roomAssigned: true, floor: `${roomFloor}, Block ${roomBlock}` } 
        : s
      ));
    }
  };

  const updateReportStatus = async (id: string, newStatus: Report["status"]) => {
    const { error } = await supabase
      .from("reports")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  return {
    inquiries,
    students,
    reports,
    loading,
    refreshData: fetchData,
    updateInquiryStatus,
    addStudent,
    deleteStudent,
    markFeePaid,
    assignRoom,
    updateReportStatus,
  };
}

