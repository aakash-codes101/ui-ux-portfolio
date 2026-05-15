// ============================================================
// Mock Data — Replace with real API calls when backend is ready
// ============================================================

import { User } from "./authContext";

export const mockUser: User = {
  id: "USR-00142",
  name: "Arjun Sharma",
  email: "arjun.sharma@stayease.com",
  studentId: "STU-20241",
  phone: "+91 98765 43210",
  roomNumber: "B-204",
  roomType: "Double Occupancy",
  floor: "2nd Floor, Block B",
  joinDate: "2024-07-01",
  avatar: "AS",
};

export type FeeItem = {
  id: string;
  label: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  month: string;
};

export const mockFees: FeeItem[] = [
  {
    id: "F001",
    label: "Hostel Fee - Instalment 1/3",
    amount: 34000,
    dueDate: "2026-04-15",
    status: "paid",
    month: "April 2026",
  },
  {
    id: "F002",
    label: "Hostel Fee - Instalment 2/3",
    amount: 34000,
    dueDate: "2026-08-15",
    status: "pending",
    month: "August 2026",
  },
  {
    id: "F003",
    label: "Hostel Fee - Instalment 3/3",
    amount: 34000,
    dueDate: "2026-12-15",
    status: "pending",
    month: "December 2026",
  },
];

export type Booking = {
  id: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "active" | "upcoming" | "completed";
  amount: number;
};

export const mockBookings: Booking[] = [
  {
    id: "BK-4521",
    roomType: "Double Occupancy",
    roomNumber: "B-204",
    checkIn: "2024-07-01",
    checkOut: "2025-05-31",
    status: "active",
    amount: 8500,
  },
  {
    id: "BK-3812",
    roomType: "Single Room",
    roomNumber: "A-112",
    checkIn: "2024-01-01",
    checkOut: "2024-06-30",
    status: "completed",
    amount: 12000,
  },
];

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  time: string;
};

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    title: "Fee Due Reminder",
    message: "Your April 2026 fees are due on April 15th.",
    type: "warning",
    time: "2 hours ago",
  },
  {
    id: "N002",
    title: "Maintenance Scheduled",
    message: "Plumbing inspection on April 14th, 10 AM. Minor disruption expected.",
    type: "info",
    time: "1 day ago",
  },
  {
    id: "N003",
    title: "Payment Received",
    message: "March 2026 payment of ₹12,200 confirmed. Receipt sent to email.",
    type: "success",
    time: "1 month ago",
  },
];

export const roomTypes = [
  { value: "single", label: "Single Room (₹12,000/mo)" },
  { value: "double", label: "Double Occupancy (₹8,500/mo)" },
  { value: "triple", label: "Triple Occupancy (₹6,500/mo)" },
];

export const amenities = [
  {
    icon: "Wifi",
    title: "High-Speed Wi-Fi",
    description: "High Speed internet in all rooms and common areas. No throttling.",
  },
  {
    icon: "Shield",
    title: "24/7 Security",
    description: "Round-the-clock CCTV surveillance and security personnel.",
  },
  {
    icon: "Utensils",
    title: "Nutritious Meals",
    description: "Four wholesome meals per day crafted by our in-house kitchen team.",
  },
  {
    icon: "WashingMachine",
    title: "Laundry Service",
    description: "Free Laundry Service",
  },
  {
    icon: "Refrigerator",
    title: "Micro Wave and Fridge",
    description: "Microwave and fridge are available for use 24/7 for students.",
  },
  {
    icon: "Dumbbell",
    title: "Fitness Centre",
    description: "Fully equipped gym with weights, and yoga space.",
  },
  {
    icon: "Bus",
    title: "Transport Pickup",
    description: "Scheduled shuttle to campus every morning and evening.",
  },
  {
    icon: "HeartPulse",
    title: "Medical Support",
    description: "On-call nurse and tie-up with nearby hospital for emergency care.",
  },
];

export const testimonials = [
  {
    name: "Aman Sinha",
    course: "B.Tech CSE, 3rd Year",
    avatar: "AS",
    rating: 5,
    text: "The hostel is really clean and the food is great. The staff is also very friendly and helpful.",
  },
  {
    name: "Rahul Verma",
    course: "MBA Finance, 1st Year",
    avatar: "RV",
    rating: 5,
    text: "Best hostel I've stayed in. The Wi-Fi is really fast, the food is great, and the staff is very friendly and helpful.",
  },
  {
    name: "Aakash Thakur",
    course: "B.Tech CSE, 3rd Year",
    avatar: "AT",
    rating: 4,
    text: "Hostel is really clean and staff are available whenever needed.",
  },
];
