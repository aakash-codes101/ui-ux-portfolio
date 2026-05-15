import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "HMR Boys Hostel — Modern Student Living",
  description:
    "Experience comfortable, secure, and community-driven student hostel living at HMR Boys Hostel. Book your room, track fees, and manage your stay — all in one place.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HMR Hostel",
  },
  keywords: ["HMR boys hostel", "hostel", "student accommodation", "room booking", "student hostel"],
  openGraph: {
    title: "HMR Boys Hostel — Modern Student Living",
    description: "Book your perfect room at HMR Boys Hostel and manage your stay with ease.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ServiceWorkerRegister />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
