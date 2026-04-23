"use client";

import { PageHeader, StatCard } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import { BarChart3, Target, Scale, Activity, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const accuracyByGroup = [
  { group: "Male", accuracy: 88 }, { group: "Female", accuracy: 65 }, { group: "Non-Binary", accuracy: 58 },
  { group: "Asian", accuracy: 82 }, { group: "Black", accuracy: 60 }, { group: "Hispanic", accuracy: 63 }, { group: "White", accuracy: 86 },
];

export default function ModelEvaluationPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (<div className="glass-card rounded-lg p-3 text-xs border border-content/10" style={{ background: `var(--content-800)` }}><p className="text-content font-medium">{label}: {payload[0].value}%</p></div>);
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Model Evaluation" description="Evaluate your model's predictions and fairness performance." />
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-content mb-1">Performance Overview</h3>
        <p className="text-xs text-content/30 mb-6">Model performance metrics across groups</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-widest text-content/40 mb-4">Overall Model Fairness</p>
            <div className="relative">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke={`rgba(${cr},0.04)`} strokeWidth="8" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.68)}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-content">0.68</span>
                <span className="text-[10px] text-content/40 font-medium">Needs Improvement</span>
              </div>
            </div>
            <p className="text-[11px] text-content/25 mt-3 text-center">Fair model performance metric (target: ≥0.80)</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Overall Accuracy" value="78.4%" icon={Target} subtitle="All groups combined" />
            <StatCard label="Balanced Accuracy" value="73.1%" icon={Scale} subtitle="Weighted by group size" />
            <StatCard label="AUC Score" value="0.81" icon={Activity} subtitle="Area under ROC curve" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-content mb-3">Accuracy by Group</h3>
          <p className="text-xs text-content/30 mb-20">Model accuracy broken down by demographic group</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyByGroup} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke={`rgba(${cr},0.04)`} />
              <XAxis dataKey="group" tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }} axisLine={{ stroke: `rgba(${cr},0.06)` }} tickLine={false} />
              <YAxis tick={{ fill: `rgba(${cr},0.35)`, fontSize: 11 }} axisLine={{ stroke: `rgba(${cr},0.06)` }} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: `rgba(${cr},0.04)` }} />
              <Bar dataKey="accuracy" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-content mb-4">Performance Gap</h3>
            <div className="text-center mb-4"><span className="text-5xl font-bold text-content">25%</span><p className="text-sm text-content/40 mt-2">Gap between best and worst performing groups</p></div>
            <div className="bg-content/[0.02] border border-content/[0.06] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2"><span className="text-xs text-content/40">Best Performing Group</span><span className="text-xs font-medium text-content/80">Male (88%)</span></div>
              <div className="flex items-center justify-between"><span className="text-xs text-content/40">Worst Performing Group</span><span className="text-xs font-medium text-content/50">Female (63%)</span></div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-content mb-3">Recommendations</h3>
            <div className="space-y-3">{["Retrain model with balanced dataset", "Apply fairness constraints during training", "Review feature importance for bias signals", "Consider post-processing calibration"].map((rec, i) => (<div key={i} className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-content/50 mt-1.5 shrink-0" /><p className="text-sm text-content/40">{rec}</p></div>))}</div>
          </div>
          <button className="w-full glass-card rounded-xl p-4 flex items-center justify-between group hover:bg-content/[0.05] transition-all"><span className="text-sm font-medium text-content/60">View Full Report</span><ArrowRight className="w-4 h-4 text-content/40 group-hover:translate-x-1 transition-transform" /></button>
        </div>
      </div>
    </div>
  );
}
