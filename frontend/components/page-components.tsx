import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-white/40 mt-1">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  accent?: "indigo" | "emerald" | "rose" | "amber" | "violet";
  className?: string;
}

const accentMap = {
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400",
    glow: "hover:shadow-indigo-500/5",
    trend: "text-indigo-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-400",
    glow: "hover:shadow-emerald-500/5",
    trend: "text-emerald-400",
  },
  rose: {
    icon: "bg-rose-500/10 text-rose-400",
    glow: "hover:shadow-rose-500/5",
    trend: "text-rose-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400",
    glow: "hover:shadow-amber-500/5",
    trend: "text-amber-400",
  },
  violet: {
    icon: "bg-violet-500/10 text-violet-400",
    glow: "hover:shadow-violet-500/5",
    trend: "text-violet-400",
  },
};

export function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = "indigo",
  className,
}: StatCardProps) {
  const colors = accentMap[accent];
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]",
        colors.glow,
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">
          {label}
        </p>
        {Icon && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.icon)}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-1.5">
          {trend && (
            <span className={cn("text-xs font-medium", trend.positive ? "text-emerald-400" : "text-rose-400")}>
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-white/30">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
