"use client";

import { PageHeader } from "@/components/page-components";
import {
  Upload as UploadIcon,
  FileText,
  Columns,
  HardDrive,
  Lightbulb,
  ArrowRight,
  Check,
  CloudUpload,
} from "lucide-react";
import { useState } from "react";

const aboutItems = [
  { icon: FileText, label: "Rows", value: "—" },
  { icon: Columns, label: "Columns", value: "—" },
  { icon: HardDrive, label: "File Size", value: "—" },
  {
    icon: Lightbulb,
    label: "Tip",
    value: "Make sure your data contains the target, protected, and relevant features.",
  },
];

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [targetVar, setTargetVar] = useState("");
  const [protectedAttr, setProtectedAttr] = useState("");
  const [prediction, setPrediction] = useState("");

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Upload & Analyze"
        description="Upload your dataset and configure analysis parameters."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Upload Zone */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1">
                {["Upload Data", "Settings", "Configure", "Complete"].map(
                  (step, i) => (
                    <span
                      key={step}
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                        i === 0
                          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                          : "text-white/25 bg-white/[0.03] border border-white/[0.04]"
                      }`}
                    >
                      {step}
                    </span>
                  )
                )}
              </div>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                dragOver
                  ? "border-indigo-500/50 bg-indigo-500/[0.05]"
                  : uploaded
                  ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                  : "border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]"
              }`}
              onClick={() => setUploaded(true)}
            >
              <div
                className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  uploaded
                    ? "bg-emerald-500/10"
                    : "bg-indigo-500/10"
                }`}
              >
                {uploaded ? (
                  <Check className="w-6 h-6 text-emerald-400" />
                ) : (
                  <CloudUpload className="w-6 h-6 text-indigo-400" />
                )}
              </div>
              <p className="text-sm font-medium text-white/70 mb-1">
                {uploaded
                  ? "hiring_data.csv uploaded"
                  : "Drag & drop your CSV file here"}
              </p>
              <p className="text-xs text-white/30">
                {uploaded
                  ? "10,000 rows · 12 columns · 2.4 MB"
                  : "Or click to browse. CSV files up to 100MB."}
              </p>
              {!uploaded && (
                <button className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg hover:bg-indigo-500/15 transition-all">
                  <UploadIcon className="w-3.5 h-3.5" />
                  Browse Files
                </button>
              )}
            </div>
          </div>

          {/* Configure Analysis */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-1">
              Configure Analysis
            </h3>
            <p className="text-xs text-white/30 mb-5">
              Target variable (What are we predicting?)
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Target Variable
                </label>
                <select
                  value={targetVar}
                  onChange={(e) => setTargetVar(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none"
                >
                  <option value="">Select target variable</option>
                  <option value="hired">hired</option>
                  <option value="approved">approved</option>
                  <option value="selected">selected</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Protected Attributes (bias concern)
                </label>
                <select
                  value={protectedAttr}
                  onChange={(e) => setProtectedAttr(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none"
                >
                  <option value="">Select protected attributes</option>
                  <option value="gender">gender</option>
                  <option value="race">race</option>
                  <option value="age">age</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Prediction Column (optional)
                </label>
                <select
                  value={prediction}
                  onChange={(e) => setPrediction(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none"
                >
                  <option value="">Upload predictions CSV (optional)</option>
                  <option value="prediction">prediction</option>
                  <option value="score">score</option>
                </select>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 mt-2">
                Analyze & Detect Bias
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column — About Your Data */}
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-1">
              About Your Data
            </h3>
            <p className="text-xs text-white/30 mb-5">
              Dataset summary and guidance
            </p>
            <div className="grid grid-cols-2 gap-4">
              {aboutItems.map((item) => (
                <div
                  key={item.label}
                  className={`bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 ${
                    item.label === "Tip" ? "col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-medium text-white/50">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Guide */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Guide
            </h3>
            <div className="space-y-3">
              {[
                "Upload a CSV file with your hiring/evaluation data",
                "Select the target variable you&apos;re predicting",
                "Choose which attributes may carry bias",
                "Run the analysis to detect disparities",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-indigo-400">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-white/50">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
