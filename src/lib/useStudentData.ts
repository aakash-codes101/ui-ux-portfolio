"use client";

import { supabase } from "./supabase";

export type ReportCategory = "Maintenance" | "Complaint" | "Request" | "Emergency" | "Other";
export type ReportPriority = "Low" | "Medium" | "High" | "Critical";

export function useStudentData() {
  const submitReport = async (reportData: {
    studentId: string;
    studentName: string;
    roomNumber: string;
    category: ReportCategory;
    title: string;
    description: string;
    priority: ReportPriority;
  }) => {
    const { data, error } = await supabase.from("reports").insert([{
      student_id: reportData.studentId,
      student_name: reportData.studentName,
      room_number: reportData.roomNumber,
      category: reportData.category,
      title: reportData.title,
      description: reportData.description,
      priority: reportData.priority,
      status: "Open"
    }]);

    if (error) throw error;
    return data;
  };

  return { submitReport };
}
