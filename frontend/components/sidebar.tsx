"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  ShieldAlert,
  Database,
  BarChart3,
  FileText,
  Clock,
  Settings,
  MessageSquare,
  Shield,
  Plus,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload & Analyze", icon: Upload },
  { href: "/bias-detection", label: "Bias Detection", icon: ShieldAlert },
  { href: "/data-synthesizer", label: "Data Synthesizer", icon: Database },
  { href: "/model-evaluation", label: "Model Evaluation", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/history", label: "History", icon: Clock },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-white/[0.06] bg-[#060609] transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/[0.06] shrink-0">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold tracking-tight text-white whitespace-nowrap">
              EquiGuard AI
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/40 hover:text-white/70 transition-colors"
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04] border border-transparent"
              )}
            >
              <item.icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/60"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* AI Assistant section */}
      <div className="border-t border-white/[0.06] p-3 shrink-0">
        <Link
          href="/ai-assistant"
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-2",
            pathname === "/ai-assistant"
              ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              : "text-white/50 hover:text-white/80 hover:bg-white/[0.04] border border-transparent"
          )}
        >
          <Sparkles
            className={cn(
              "w-[18px] h-[18px] shrink-0",
              pathname === "/ai-assistant"
                ? "text-indigo-400"
                : "text-white/40 group-hover:text-white/60"
            )}
          />
          {!collapsed && <span>AI Assistant</span>}
        </Link>
        {!collapsed && (
          <>
            <p className="text-[11px] text-white/30 px-3 mb-2">
              Ask me anything about bias, fairness, or your dataset...
            </p>
            <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 transition-all">
              <Plus className="w-3.5 h-3.5" />
              New Chat
            </button>
          </>
        )}
      </div>

      {/* User */}
      <div className="border-t border-white/[0.06] p-3 shrink-0">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white/80 truncate">
                Admin
              </p>
              <p className="text-[11px] text-white/30 truncate">
                admin@equiguard.ai
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
