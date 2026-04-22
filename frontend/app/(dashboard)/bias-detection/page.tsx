"use client";

import { PageHeader } from "@/components/page-components";
import {
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Eye,
  Filter,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const selectionRateData = [
  { name: "Male", value: 68, color: "#818cf8" },
  { name: "Female", value: 45, color: "#f472b6" },
  { name: "Non-Binary", value: 38, color: "#a78bfa" },
];

const keyInsights = [
  "Females are 1.5x less likely to be selected",
  "Data has a strong correlation between gender and selection",
  "Educational Field weights disproportionately affect minority groups",
  "Selection rate for protected groups is below the 4/5 rule threshold",
];

const biasMetricsSummary = [
  { name: "Disparate Impact", value: "0.25", threshold: "< 0.80", status: "fail" },
  { name: "Statistical Parity", value: "0.60", threshold: "< 0.10", status: "fail" },
];

const topBiasedFeatures = [
  { name: "Gender → Hiring", severity: 0.92 },
  { name: "University Prestige", severity: 0.78 },
  { name: "Name Ethnicity Signal", severity: 0.71 },
  { name: "Years in Industry", severity: 0.45 },
  { name: "Address Zip Code", severity: 0.38 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs border border-white/10">
        <p className="text-white font-medium">{payload[0].name}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function BiasDetectionPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Bias Detection"
        description="Detailed bias analysis results and fairness metrics."
        action={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 text-sm text-white/50 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              <Filter className="w-3.5 h-3.5" />
              Group: Gender
            </button>
            <button className="inline-flex items-center gap-2 text-sm text-white/50 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
              <Eye className="w-3.5 h-3.5" />
              View Options
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Main bias score + chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bias Score Banner */}
          <div className="glass-card rounded-xl p-6 glow-rose">
            <div className="flex items-center gap-6">
              <div className="relative">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="rgba(251,113,133,0.7)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.72)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-rose-300">0.72</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full">
                    High Bias Detected
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Bias Score</h3>
                <p className="text-sm text-white/40 max-w-md">
                  The AI model demonstrates significant selection disparities
                  across protected demographic groups, particularly by gender.
                </p>
              </div>
            </div>
          </div>

          {/* Selection Rate by Group */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-1">
              Selection Rate by Group
            </h3>
            <p className="text-xs text-white/30 mb-4">
              Hiring selection rates across demographic categories
            </p>
            <div className="flex items-center gap-8">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={selectionRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {selectionRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {selectionRateData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-white/60">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Biased Features */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-1">
              Top Biased Features
            </h3>
            <p className="text-xs text-white/30 mb-5">
              Features contributing most to bias in the model
            </p>
            <div className="space-y-4">
              {topBiasedFeatures.map((f) => (
                <div key={f.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/60">{f.name}</span>
                    <span
                      className={`text-xs font-medium ${
                        f.severity > 0.7
                          ? "text-rose-400"
                          : f.severity > 0.5
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {(f.severity * 100).toFixed(0)}% impact
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.04]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        f.severity > 0.7
                          ? "bg-gradient-to-r from-rose-600/70 to-rose-400/50"
                          : f.severity > 0.5
                          ? "bg-gradient-to-r from-amber-600/70 to-amber-400/50"
                          : "bg-gradient-to-r from-emerald-600/70 to-emerald-400/50"
                      }`}
                      style={{ width: `${f.severity * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Key Insights */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              Key Insights
            </h3>
            <div className="space-y-3">
              {keyInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/50 leading-relaxed">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bias Metrics Summary */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              Bias Metrics Summary
            </h3>
            <div className="space-y-4">
              {biasMetricsSummary.map((m) => (
                <div key={m.name} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-white/50">
                      {m.name}
                    </span>
                    <span className="text-[10px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                      FAIL
                    </span>
                  </div>
                  <span className="text-3xl font-bold text-rose-300">
                    {m.value}
                  </span>
                  <p className="text-[11px] text-white/25 mt-1">
                    Threshold: {m.threshold}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* View Full Analysis */}
          <button className="w-full glass-card rounded-xl p-4 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
            <span className="text-sm font-medium text-indigo-300">
              View Full Analysis
            </span>
            <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
