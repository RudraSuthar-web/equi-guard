"use client";

import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#030305]">
      <Sidebar />
      {/* Main content area — offset by sidebar width */}
      <div className="flex-1 ml-[240px] transition-all duration-300">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] opacity-[0.07] blur-[120px] z-0"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
