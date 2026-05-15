"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUser } from "./mockData";
import { supabase } from "./supabase";

export type User = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone: string;
  roomNumber: string;
  roomType: string;
  floor: string;
  joinDate: string;
  avatar: string;
  role?: "student" | "admin";
  username?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, studentId: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("hostel_user", JSON.stringify(user));
    } else if (!isLoading) {
      localStorage.removeItem("hostel_user");
    }
  }, [user, isLoading]);

  useEffect(() => {
    // Check active sessions from Supabase
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Fetch profile data from students table if it's a student
          const { data: profile } = await supabase
            .from('students')
            .select('*')
            .eq('email', session.user.email)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              name: profile.name,
              email: profile.email,
              studentId: profile.student_id,
              phone: profile.phone,
              roomNumber: profile.room_number,
              roomType: profile.room_type,
              floor: profile.room_floor,
              joinDate: profile.admission_date,
              avatar: profile.avatar,
              role: profile.role as "student" | "admin",
              username: profile.username
            });
            setIsLoading(false);
            return;
          } else {
            // Fallback for admin or incomplete profiles
            setUser({
              id: session.user.id,
              name: session.user.user_metadata?.name || "User",
              email: session.user.email || "",
              studentId: "ADMIN",
              phone: "",
              roomNumber: "",
              roomType: "",
              floor: "",
              joinDate: new Date().toISOString(),
              avatar: "U",
              role: session.user.user_metadata?.role || "admin"
            });
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Supabase session check failed", err);
      }

      // Fallback: check localStorage for manual student logins
      const stored = localStorage.getItem("hostel_user");
      if (stored) {
        try {
          const parsedUser = JSON.parse(stored);
          setUser(parsedUser);
        } catch (e) {
          localStorage.removeItem("hostel_user");
        }
      }
      setIsLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setUser(null);
      } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED' || _event === 'USER_UPDATED') {
        checkUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (identifier: string, password: string) => {
    // Admin override for development/initial setup
    if (identifier === "tempp0321@gmail.com" && password === "admin1234") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
      });
      if (!error) return { success: true };
      // If auth fails but credentials match, it might not be in Supabase Auth yet
    }

    // Try Supabase Auth first (for admin and users who signed up themselves)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier.includes('@') ? identifier : `${identifier}@hostel.com`,
      password: password,
    });

    if (!error) return { success: true };

    // NEW: If Auth fails, check the "students" table (for admin-created students)
    const { data: studentRecord, error: dbError } = await supabase
      .from('students')
      .select('*')
      .or(`email.eq.${identifier},username.eq.${identifier}`)
      .eq('password', password)
      .single();

    if (studentRecord && !dbError) {
      setUser({
        id: studentRecord.id,
        name: studentRecord.name,
        email: studentRecord.email,
        studentId: studentRecord.student_id,
        phone: studentRecord.phone,
        roomNumber: studentRecord.room_number,
        roomType: studentRecord.room_type,
        floor: studentRecord.room_floor,
        joinDate: studentRecord.admission_date,
        avatar: studentRecord.avatar,
        role: "student",
        username: studentRecord.username
      });
      return { success: true };
    }

    return { success: false, error: error?.message || "Invalid credentials" };
  };

  const signup = async (name: string, email: string, password: string, studentId: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          student_id: studentId,
          role: 'student'
        }
      }
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
