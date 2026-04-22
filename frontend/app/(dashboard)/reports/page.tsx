"use client";

import { PageHeader } from "@/components/page-components";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  ArrowRight,
  Shield,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const auditReports = [
  {
    id: 1,
    name: "Fairness Audit Report",
    description: "Comprehensive bias analysis and fairness metrics",
    date: "11 May 2026",
    type: "Audit",
    status: "ready",
  },
  {
    id: 2,
    name: "Model Evaluation Report",
    description: "Model performance and accuracy breakdown",
    date: "11 May 2026",
    type: "Evaluation",
    status: "ready",
  },
  {
    id: 3,
    name: "Data Synthesis Report",
    description: "Synthetic data generation and impact analysis",
    date: "10 May 2026",
    type: "Synthesis",
    status: "ready",
  },
  {
    id: 4,
    name: "Compliance Summary",
    description: "Regulatory compliance and recommendations",
    date: "10 May 2026",
    type: "Compliance",
    status: "generating",
  },
];

const reportPreview = {
  title: "Fairness Audit Report",
  subtitle: "EquiGuard · Generated 11 May 2026",
  sections: [
    { label: "Bias Score", value: "0.72 → 0.24", color: "text-emerald-400" },
    { label: "Disparity Reduction", value: "66.7%", color: "text-indigo-300" },
    { label: "Records Analyzed", value: "10,000", color: "text-white/70" },
    { label: "Synthetic Added", value: "4,000", color: "text-violet-300" },
  ],
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"audit" | "custom">("audit");

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Reports"
        description="Generate and download fairness audit reports."
        action={
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-white/[0.03] border border-white/[0.06] rounded-lg p-1 w-fit">
        {(["audit", "custom"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {tab === "audit" ? "Audit Reports" : "Custom Reports"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">
            Available Reports
          </h3>
          {auditReports.map((report) => (
            <div
              key={report.id}
              className="glass-card rounded-xl p-5 flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  {report.type === "Audit" ? (
                    <Shield className="w-5 h-5 text-indigo-400" />
                  ) : report.type === "Evaluation" ? (
                    <BarChart3 className="w-5 h-5 text-violet-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-indigo-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80">
                    {report.name}
                  </h4>
                  <p className="text-xs text-white/30 mt-0.5">
                    {report.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </div>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider mt-0.5 inline-block ${
                      report.status === "ready"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {report.status === "ready" ? "Ready" : "Generating..."}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all">
                    <Eye className="w-3.5 h-3.5 text-white/40" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all">
                    <Download className="w-3.5 h-3.5 text-white/40" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-medium text-white/30 uppercase tracking-widest mb-3">
            Report Preview
          </h3>
          <div className="glass-card rounded-xl overflow-hidden">
            {/* Preview header */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-violet-600/20 border-b border-white/[0.06] p-5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-medium text-indigo-300 uppercase tracking-wider">
                  EquiGuard Report
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {reportPreview.title}
              </h4>
              <p className="text-xs text-white/30 mt-1">
                {reportPreview.subtitle}
              </p>
            </div>

            {/* Preview content */}
            <div className="p-5 space-y-4">
              {reportPreview.sections.map((section) => (
                <div
                  key={section.label}
                  className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
                >
                  <span className="text-xs text-white/40">{section.label}</span>
                  <span className={`text-sm font-semibold ${section.color}`}>
                    {section.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="border-t border-white/[0.06] p-4 flex gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium text-white/50 bg-white/[0.04] hover:bg-white/[0.06] px-4 py-2.5 rounded-lg transition-all">
                <Eye className="w-3.5 h-3.5" />
                View Full Preview
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15 px-4 py-2.5 rounded-lg transition-all">
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
