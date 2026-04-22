"use client";

import { PageHeader, StatCard } from "@/components/page-components";
import {
  BarChart3,
  Target,
  Scale,
  Activity,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const accuracyByGroup = [
  { group: "Male", accuracy: 88 },
  { group: "Female", accuracy: 65 },
  { group: "Non-Binary", accuracy: 58 },
  { group: "Asian", accuracy: 82 },
  { group: "Black", accuracy: 60 },
  { group: "Hispanic", accuracy: 63 },
  { group: "White", accuracy: 86 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs border border-white/10">
        <p className="text-white font-medium">{label}: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ModelEvaluationPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Model Evaluation"
        description="Evaluate your model's predictions and fairness performance."
      />

      {/* Performance Overview */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-white mb-1">
          Performance Overview
        </h3>
        <p className="text-xs text-white/30 mb-6">
          Model performance metrics across groups
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Fairness Score Ring */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
              Overall Model Fairness
            </p>
            <div className="relative">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="rgba(251,191,36,0.6)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.68)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-amber-300">0.68</span>
                <span className="text-[10px] text-amber-400/60 font-medium">
                  Needs Improvement
                </span>
              </div>
            </div>
            <p className="text-[11px] text-white/25 mt-3 text-center">
              Fair model performance metric (target: ≥0.80)
            </p>
          </div>

          {/* Stat Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Overall Accuracy"
              value="78.4%"
              icon={Target}
              accent="indigo"
              subtitle="All groups combined"
            />
            <StatCard
              label="Balanced Accuracy"
              value="73.1%"
              icon={Scale}
              accent="violet"
              subtitle="Weighted by group size"
            />
            <StatCard
              label="AUC Score"
              value="0.81"
              icon={Activity}
              accent="emerald"
              subtitle="Area under ROC curve"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accuracy by Group Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">
            Accuracy by Group
          </h3>
          <p className="text-xs text-white/30 mb-6">
            Model accuracy broken down by demographic group
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyByGroup} barSize={32}>
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
              <Bar
                dataKey="accuracy"
                fill="rgba(129,140,248,0.6)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Gap */}
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              Performance Gap
            </h3>
            <div className="text-center mb-4">
              <span className="text-5xl font-bold text-rose-300">25%</span>
              <p className="text-sm text-white/40 mt-2">
                Gap between best and worst performing groups
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40">
                  Best Performing Group
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  Male (88%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Worst Performing Group
                </span>
                <span className="text-xs font-medium text-rose-400">
                  Female (63%)
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-3">
              Recommendations
            </h3>
            <div className="space-y-3">
              {[
                "Retrain model with balanced dataset",
                "Apply fairness constraints during training",
                "Review feature importance for bias signals",
                "Consider post-processing calibration",
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <p className="text-sm text-white/40">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full glass-card rounded-xl p-4 flex items-center justify-between group hover:bg-white/[0.05] transition-all">
            <span className="text-sm font-medium text-indigo-300">
              View Full Report
            </span>
            <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
