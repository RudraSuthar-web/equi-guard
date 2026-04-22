"use client";

import { PageHeader, StatCard } from "@/components/page-components";
import {
  ShieldCheck,
  TrendingDown,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const biasOverviewData = [
  { group: "Male", before: 78, after: 82 },
  { group: "Female", before: 62, after: 79 },
  { group: "Non-Binary", before: 58, after: 77 },
  { group: "Asian", before: 71, after: 80 },
  { group: "Black", before: 55, after: 76 },
  { group: "Hispanic", before: 60, after: 78 },
  { group: "White", before: 80, after: 83 },
];

const biasMetrics = [
  { metric: "Disparate Impact", before: "0.52", after: "0.88", status: "improved" },
  { metric: "Statistical Parity Difference", value: "0.24", after: "0.04", status: "improved" },
  { metric: "Equal Opportunity Difference", before: "0.41", after: "0.08", status: "improved" },
  { metric: "Average Odds Difference", before: "0.35", after: "0.06", status: "improved" },
];

const explanations = [
  {
    title: "AI Explanation (Why is this happening?)",
    content:
      "The model shows significant gender bias. Male candidates are 1.3x more likely to be selected than female candidates. This mostly maps to historical data imbalance and feature selection bias, particularly in the 'years_experience' and 'university_tier' fields.",
  },
];

const topFeatures = [
  { name: "Gender → Selection", impact: 0.82, type: "bias" },
  { name: "University Tier", impact: 0.67, type: "bias" },
  { name: "Years Experience", impact: 0.54, type: "fair" },
  { name: "Skills Match", impact: 0.91, type: "fair" },
  { name: "Age Group", impact: 0.45, type: "bias" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs border border-white/10">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-white/60">
            {p.dataKey === "before" ? "Before" : "After"}: <span className="text-white font-medium">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard"
        description="Overview of your latest analysis and fairness insights."
        action={
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
            <Plus className="w-4 h-4" />
            New Analysis
          </button>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Overall Bias Score"
          value="0.72"
          subtitle="From 0.73 to 0.24"
          icon={ShieldCheck}
          trend={{ value: "High Bias", positive: false }}
          accent="rose"
        />
        <StatCard
          label="Disparity Reduction"
          value="66.7%"
          icon={TrendingDown}
          trend={{ value: "↓ 0.86 after synthesis", positive: true }}
          accent="emerald"
        />
        <StatCard
          label="Records Processed"
          value="10,000"
          subtitle="6,000 original + 4,000 synthetic"
          icon={Users}
          accent="indigo"
        />
        <StatCard
          label="Fairness Status"
          value="Improved"
          subtitle="After Correction"
          icon={CheckCircle2}
          trend={{ value: "Pass", positive: true }}
          accent="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bias Overview Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Bias Overview (Before vs After)
              </h3>
              <p className="text-xs text-white/30 mt-0.5">
                Selection scores across demographic groups
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/60" />
                <span className="text-white/40">Before</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/80" />
                <span className="text-white/40">After</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={biasOverviewData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="group"
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" fill="rgba(244,63,94,0.5)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" fill="rgba(99,102,241,0.7)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bias Metrics */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Bias Metrics</h3>
          <p className="text-xs text-white/30 mb-5">Key fairness indicators</p>
          <div className="space-y-4">
            {biasMetrics.map((m) => (
              <div key={m.metric} className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/60">{m.metric}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-semibold text-rose-400">
                      {m.before || m.value}
                    </span>
                    <ArrowRight className="w-3 h-3 text-white/20" />
                    <span className="text-sm font-semibold text-emerald-400">
                      {m.after}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            View all metrics <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Explanation */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">
              AI Explanation (Why is this happening?)
            </h3>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-5">
            {explanations[0].content}
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {["66% Top-10 Biased", "Male Sig. Overrep'd", "Gender Top Feature", "Selection Gap → 23%"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-white/50 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            View Full Explanation <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Top Fairness Features */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">
            Top Fairness Features
          </h3>
          <p className="text-xs text-white/30 mb-5">
            What We Did — Impact breakdown
          </p>
          <div className="space-y-3">
            {topFeatures.map((f) => (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/60">{f.name}</span>
                  <span
                    className={`text-xs font-medium ${
                      f.type === "bias" ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {(f.impact * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      f.type === "bias"
                        ? "bg-gradient-to-r from-rose-500/60 to-rose-400/40"
                        : "bg-gradient-to-r from-emerald-500/60 to-emerald-400/40"
                    }`}
                    style={{ width: `${f.impact * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            View Feature Impact <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
