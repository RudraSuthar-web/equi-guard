// "use client";

// import { PageHeader, StatCard } from "@/components/page-components";
// import { useTheme } from "@/components/theme-provider";
// import { ShieldCheck, TrendingDown, Users, CheckCircle2, AlertTriangle, ArrowRight, Plus } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const biasOverviewData = [
//   { group: "Male", before: 78, after: 82 }, { group: "Female", before: 62, after: 79 },
//   { group: "Non-Binary", before: 58, after: 77 }, { group: "Asian", before: 71, after: 80 },
//   { group: "Black", before: 55, after: 76 }, { group: "Hispanic", before: 60, after: 78 },
//   { group: "White", before: 80, after: 83 },
// ];

// const biasMetrics = [
//   { metric: "Disparate Impact", before: "0.52", after: "0.88", status: "improved" },
//   { metric: "Statistical Parity Difference", value: "0.24", after: "0.04", status: "improved" },
//   { metric: "Equal Opportunity Difference", before: "0.41", after: "0.08", status: "improved" },
//   { metric: "Average Odds Difference", before: "0.35", after: "0.06", status: "improved" },
// ];

// const explanations = [
//   { title: "AI Explanation (Why is this happening?)", content: "The model shows significant gender bias. Male candidates are 1.3x more likely to be selected than female candidates. This mostly maps to historical data imbalance and feature selection bias, particularly in the 'years_experience' and 'university_tier' fields." },
// ];

// const topFeatures = [
//   { name: "Gender → Selection", impact: 0.82, type: "bias" }, { name: "University Tier", impact: 0.67, type: "bias" },
//   { name: "Years Experience", impact: 0.54, type: "fair" }, { name: "Skills Match", impact: 0.91, type: "fair" },
//   { name: "Age Group", impact: 0.45, type: "bias" },
// ];

// export default function DashboardPage() {
//   const { contentRgb } = useTheme();
//   const cr = contentRgb;

//   const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="glass-card rounded-lg p-3  text-xs border border-content/10" style={{ background: `var(--content-800)` }}>
//           <p className="text-content font-medium mb-1">{label}</p>
//           {payload.map((p, i) => (
//             <p key={i} className="text-content/60">{p.dataKey === "before" ? "Before" : "After"}: <span className="text-content font-medium">{p.value}</span></p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <PageHeader title="Dashboard" description="Overview of your latest fairness audits and automated decision insights."
//         action={<button className="inline-flex items-center gap-2 bg-cta text-cta-foreground text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-cta/90 shadow-lg shadow-content/[0.05]"><Plus className="w-4 h-4" />New Audit</button>}
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-8 md:mb-8">
//         <StatCard label="Overall Bias Score" value="0.72" subtitle="From 0.73 to 0.24" icon={ShieldCheck} trend={{ value: "High Bias", positive: false }} />
//         <StatCard label="Disparity Reduction" value="66.7%" icon={TrendingDown} trend={{ value: "↓ 0.86 after synthesis", positive: true }} />
//         <StatCard label="Decisions Audited" value="10,000" subtitle="6,000 original + 4,000 synthetic" icon={Users} />
//         <StatCard label="Fairness Status" value="Improved" subtitle="After Correction" icon={CheckCircle2} trend={{ value: "Pass", positive: true }} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
//         <div className="lg:col-span-2 glass-card rounded-xl p-4 md:p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-sm font-semibold text-content">Bias Overview (Before vs After)</h3>
//               <p className="text-xs text-content/30 mt-0.5">Decision scores across demographic breakdowns</p>
//             </div>
//             <div className="flex items-center gap-4 text-xs">
//               <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/40 " /><span className="text-muted-foreground">Before</span></span>
//               <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary" /><span className="text-primary">After</span></span>
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={260}>
//             <BarChart data={biasOverviewData} barGap={4}>
//               <CartesianGrid strokeDasharray="3 3" stroke={`rgba(${cr},0.06)`} />
//               <XAxis dataKey="group" tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }} axisLine={{ stroke: `rgba(${cr},0.06)` }} tickLine={false} />
//               <YAxis tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }} axisLine={{ stroke: `rgba(${cr},0.06)` }} tickLine={false} domain={[0, 100]} />
//               <Tooltip content={<CustomTooltip />} cursor={{ fill: `rgba(${cr},0.04)` }} />
//               <Bar dataKey="before" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} opacity={0.5} />
//               <Bar dataKey="after" fill="var(--primary)" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="glass-card rounded-xl p-4 md:p-6">
//           <h3 className="text-sm md:text-base font-semibold text-content mb-1">Bias Metrics</h3>
//           <p className="text-xs text-content/30 mb-5">Key fairness indicators</p>
//           <div className="space-y-4">
//             {biasMetrics.map((m) => (
//               <div key={m.metric} className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-content/60">{m.metric}</p>
//                   <div className="flex items-center gap-2 mt-0.5">
//                     <span className="text-sm font-semibold text-content/40">{m.before || m.value}</span>
//                     <ArrowRight className="w-3 h-3 text-content/20" />
//                     <span className="text-sm font-semibold text-content">{m.after}</span>
//                   </div>
//                 </div>
//                 <span className="text-[10px] font-medium uppercase tracking-wider text-content/70 bg-content/[0.06] px-2 py-0.5 rounded-full">{m.status}</span>
//               </div>
//             ))}
//           </div>
//           <button className="mt-5 text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">View all metrics <ArrowRight className="w-3 h-3" /></button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//         <div className="glass-card rounded-xl p-4 md:p-6">
//           <div className="flex items-center gap-2 mb-3 md:mb-4">
//             <AlertTriangle className="w-4 h-4 text-content/60" />
//             <h3 className="text-sm md:text-base font-semibold text-content">AI Explanation (Why is this happening?)</h3>
//           </div>
//           <p className="text-xs md:text-sm text-content/50 leading-relaxed mb-4 md:mb-5">{explanations[0].content}</p>
//           <div className="flex flex-wrap gap-3 mb-4">
//             {["66% Top-10 Biased", "Male Sig. Overrep'd", "Gender Top Feature", "Selection Gap → 23%"].map((tag) => (
//               <span key={tag} className="text-[11px] text-content/50 bg-content/[0.04] border border-content/[0.06] px-2.5 py-1 rounded-full">{tag}</span>
//             ))}
//           </div>
//           <button className="text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">View Full Explanation <ArrowRight className="w-3 h-3" /></button>
//         </div>

//         <div className="glass-card rounded-xl p-8 md:p-6">
//           <h3 className="text-xl md:text-base font-semibold text-content mb-1">Top Fairness Features</h3>
//           <p className="text-[15px] md:text-xs text-content/30 mb-4 md:mb-5">What We Did — Impact breakdown</p>
//           <div className="space-y-3">
//             {topFeatures.map((f) => (
//               <div key={f.name}>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <span className="text-[12px] md:text-xs text-content/60">{f.name}</span>
//                   <span className={`text-[12px] md:text-xs font-medium ${f.type === "bias" ? "text-content/40" : "text-content/70"}`}>{(f.impact * 100).toFixed(0)}%</span>
//                 </div>
//                 <div className="w-full h-1.5 rounded-full bg-content/[0.04]">
//                   <div className={`h-full rounded-full transition-all duration-700 ${f.type === "bias" ? "bg-gradient-to-r from-content/30 to-content/15" : "bg-gradient-to-r from-content/50 to-content/30"}`} style={{ width: `${f.impact * 100}%` }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button className="mt-5 text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">View Feature Impact <ArrowRight className="w-3 h-3" /></button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { PageHeader, StatCard } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import {
  ShieldCheck, TrendingDown, Users, CheckCircle2,
  AlertTriangle, ArrowRight, Plus,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

// ── MOCK DATA ─────────────────────────────────────────────────────────────────

const biasOverviewData = [
  { group: "Male",       before: 78, after: 82 },
  { group: "Female",     before: 62, after: 79 },
  { group: "Non-Binary", before: 58, after: 77 },
  { group: "Asian",      before: 71, after: 80 },
  { group: "Black",      before: 55, after: 76 },
  { group: "Hispanic",   before: 60, after: 78 },
  { group: "White",      before: 80, after: 83 },
];

const biasMetrics = [
  { metric: "Disparate Impact",              before: "0.52", after: "0.88", status: "improved" },
  { metric: "Statistical Parity Difference", before: "0.24", after: "0.04", status: "improved" },
  { metric: "Equal Opportunity Difference",  before: "0.41", after: "0.08", status: "improved" },
  { metric: "Average Odds Difference",       before: "0.35", after: "0.06", status: "improved" },
];

const explanations = [
  {
    content:
      "The model shows significant gender bias. Male candidates are 1.3x more likely to be selected than female candidates. This mostly maps to historical data imbalance and feature selection bias, particularly in the 'years_experience' and 'university_tier' fields.",
  },
];

const topFeatures = [
  { name: "Gender → Selection", impact: 0.82, type: "bias" },
  { name: "University Tier",    impact: 0.67, type: "bias" },
  { name: "Years Experience",   impact: 0.54, type: "fair" },
  { name: "Skills Match",       impact: 0.91, type: "fair" },
  { name: "Age Group",          impact: 0.45, type: "bias" },
];

// ── CUSTOM TOOLTIP (outside component — no re-creation on render) ─────────────

function CustomTooltip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#13151c",
        border: "0.5px solid #2e3248",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      <p style={{ color: "#e2e4ea", fontWeight: 600, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}
        >
          <span
            style={{
              width: 8, height: 8, borderRadius: 2,
              background: p.dataKey === "before" ? "#6b7280" : "#5b5bd6",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#6b7280" }}>
            {p.dataKey === "before" ? "Before:" : "After:"}
          </span>
          <span style={{ color: "#e2e4ea", fontWeight: 700 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard"
        description="Overview of your latest fairness audits and automated decision insights."
        action={
          <button className="inline-flex items-center gap-2 bg-cta text-cta-foreground text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-cta/90 shadow-lg shadow-content/[0.05]">
            <Plus className="w-4 h-4" /> New Audit
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 mb-8">
        <StatCard label="Overall Bias Score"  value="0.72"     subtitle="From 0.73 to 0.24"              icon={ShieldCheck}  trend={{ value: "High Bias", positive: false }} />
        <StatCard label="Disparity Reduction" value="66.7%"    icon={TrendingDown}                        trend={{ value: "↓ 0.86 after synthesis", positive: true }} />
        <StatCard label="Decisions Audited"   value="10,000"   subtitle="6,000 original + 4,000 synthetic" icon={Users} />
        <StatCard label="Fairness Status"     value="Improved" subtitle="After Correction"               icon={CheckCircle2} trend={{ value: "Pass", positive: true }} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">

        {/* Bar Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-content">Bias Overview (Before vs After)</h3>
              <p className="text-xs text-content/30 mt-0.5">Decision scores across demographic breakdowns</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/40" />
                <span className="text-muted-foreground">Before</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                <span className="text-primary">After</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={biasOverviewData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={`rgba(${cr},0.06)`} />
              <XAxis
                dataKey="group"
                tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }}
                axisLine={{ stroke: `rgba(${cr},0.06)` }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }}
                axisLine={{ stroke: `rgba(${cr},0.06)` }}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: `rgba(${cr},0.04)` }} />
              <Bar dataKey="before" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} opacity={0.5} />
              <Bar dataKey="after"  fill="var(--primary)"          radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bias Metrics */}
        <div className="glass-card rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base font-semibold text-content mb-1">Bias Metrics</h3>
          <p className="text-xs text-content/30 mb-5">Key fairness indicators</p>
          <div className="space-y-4">
            {biasMetrics.map((m) => (
              <div key={m.metric} className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-content/60">{m.metric}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-semibold text-content/40">{m.before}</span>
                    <ArrowRight className="w-3 h-3 text-content/20" />
                    <span className="text-sm font-semibold text-content">{m.after}</span>
                  </div>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-content/70 bg-content/[0.06] px-2 py-0.5 rounded-full">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-5 text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">
            View all metrics <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* AI Explanation */}
        <div className="glass-card rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <AlertTriangle className="w-4 h-4 text-content/60" />
            <h3 className="text-sm md:text-base font-semibold text-content">
              AI Explanation (Why is this happening?)
            </h3>
          </div>
          <p className="text-xs md:text-sm text-content/50 leading-relaxed mb-4 md:mb-5">
            {explanations[0].content}
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            {["66% Top-10 Biased", "Male Sig. Overrep'd", "Gender Top Feature", "Selection Gap → 23%"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-content/50 bg-content/[0.04] border border-content/[0.06] px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">
            View Full Explanation <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Top Features */}
        <div className="glass-card rounded-xl p-4 md:p-6">
          <h3 className="text-sm md:text-base font-semibold text-content mb-1">Top Fairness Features</h3>
          <p className="text-xs text-content/30 mb-4 md:mb-5">What We Did — Impact breakdown</p>
          <div className="space-y-3">
            {topFeatures.map((f) => (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-content/60">{f.name}</span>
                  <span className={`text-xs font-medium ${f.type === "bias" ? "text-content/40" : "text-content/70"}`}>
                    {(f.impact * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-content/[0.04]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      f.type === "bias"
                        ? "bg-gradient-to-r from-content/30 to-content/15"
                        : "bg-gradient-to-r from-content/50 to-content/30"
                    }`}
                    style={{ width: `${f.impact * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 text-xs text-content/50 hover:text-content/80 transition-colors flex items-center gap-1">
            View Feature Impact <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}