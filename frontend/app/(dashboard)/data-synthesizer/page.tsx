"use client";

import { PageHeader } from "@/components/page-components";
import {
  Database,
  Sparkles,
  ArrowRight,
  Info,
  RefreshCw,
} from "lucide-react";

const currentImbalances = [
  { gender: "Male", count: "6,000", selectionRate: "68%", flag: false },
  { gender: "Female", count: "3,000", selectionRate: "45%", flag: true },
  { gender: "Non-Binary", count: "1,000", selectionRate: "38%", flag: true },
];

const targetDistribution = [
  { gender: "Male", count: "6,000", target: "" },
  { gender: "Female", count: "5,500", target: "Generate +2,500" },
  { gender: "Prefer not to say", count: "4,500", target: "Generate +3,500" },
];

export default function DataSynthesizerPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Data Synthesizer"
        description="Generate synthetic data to balance your dataset."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Imbalances */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">
            Current Imbalances (Before)
          </h3>
          <p className="text-xs text-white/30 mb-5">
            Demographic group distribution
          </p>
          <div className="overflow-hidden rounded-lg border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-4 py-3">
                    Gender
                  </th>
                  <th className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-4 py-3">
                    Count
                  </th>
                  <th className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-4 py-3">
                    Selection Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentImbalances.map((row) => (
                  <tr
                    key={row.gender}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-4 py-3 text-sm text-white/70">
                      {row.gender}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">
                      {row.count}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-medium ${
                          row.flag ? "text-rose-400" : "text-white/70"
                        }`}
                      >
                        {row.selectionRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/[0.06] bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm font-semibold text-white/60">
                    Total
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-white/60">
                    10,000
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="glass-card rounded-xl p-6 glow-indigo">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">
              AI Recommendation
            </h3>
          </div>
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            To achieve fairness, we recommend generating{" "}
            <span className="text-indigo-300 font-medium">6,000 synthetic records</span>{" "}
            for the female group.
          </p>

          <div className="space-y-3 mb-6">
            {[
              "Balance the dataset",
              "Maintain statistical properties & relationships",
              "Redistribute 4,000 synthetic fair records",
              "Generated 4,000 synthetic fair records",
              "Bias reduced by 66.7%",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-sm text-white/40">{item}</p>
              </div>
            ))}
          </div>

          <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
            <Database className="w-4 h-4" />
            Generate Synthetic Data
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Distribution */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">
            Target Distribution (After)
          </h3>
          <p className="text-xs text-white/30 mb-5">
            Proposed distribution after synthesis
          </p>
          <div className="overflow-hidden rounded-lg border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-4 py-3">
                    Gender
                  </th>
                  <th className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-4 py-3">
                    Target Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {targetDistribution.map((row) => (
                  <tr
                    key={row.gender}
                    className="border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-4 py-3 text-sm text-white/70">
                      {row.gender}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/50">
                          {row.count}
                        </span>
                        {row.target && (
                          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            {row.target}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/[0.06] bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm font-semibold text-white/60">
                    Total
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-white/60">
                    16,000
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-white/25 mt-4">
            Achieving ~100% selection rate balance for all classes.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="glass-card rounded-xl p-5 mt-6 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-sm text-white/40 leading-relaxed">
          Synthetic data is AI-generated and does not represent real individuals.
          It is used solely to reduce bias and improve fairness in the dataset.
          All generated data maintains the statistical properties of the original
          while ensuring equitable representation.
        </p>
      </div>
    </div>
  );
}
