"use client";

import { PageHeader } from "@/components/page-components";
import { Upload as UploadIcon, FileText, Columns, HardDrive, Lightbulb, ArrowRight, Check, CloudUpload, ChevronDown } from "lucide-react";
import { useState } from "react";

const aboutItems = [
  { icon: FileText, label: "Rows", value: "—" }, { icon: Columns, label: "Columns", value: "—" },
  { icon: HardDrive, label: "File Size", value: "—" },
  { icon: Lightbulb, label: "Tip", value: "Make sure your data contains the target, protected, and relevant features." },
];

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [targetVar, setTargetVar] = useState("");
  const [protectedAttr, setProtectedAttr] = useState("");
  const [prediction, setPrediction] = useState("");

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Upload & Analyze" description="Upload your dataset and configure analysis parameters." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1">{["Upload Data", "Settings", "Configure", "Complete"].map((step, i) => (<span key={step} className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${i === 0 ? "bg-content/[0.1] text-content border border-content/[0.15]" : "text-content/25 bg-content/[0.03] border border-content/[0.04]"}`}>{step}</span>))}</div>
            </div>
            <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); }}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${dragOver ? "border-content/30 bg-content/[0.03]" : uploaded ? "border-content/20 bg-content/[0.02]" : "border-content/[0.08] hover:border-content/[0.15] hover:bg-content/[0.02]"}`}
              onClick={() => setUploaded(true)}>
              <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${uploaded ? "bg-content/[0.08]" : "bg-content/[0.06]"}`}>
                {uploaded ? <Check className="w-6 h-6 text-content/70" /> : <CloudUpload className="w-6 h-6 text-content/60" />}
              </div>
              <p className="text-sm font-medium text-content/70 mb-1">{uploaded ? "hiring_data.csv uploaded" : "Drag & drop your CSV file here"}</p>
              <p className="text-xs text-content/30">{uploaded ? "10,000 rows · 12 columns · 2.4 MB" : "Or click to browse. CSV files up to 100MB."}</p>
              {!uploaded && (<button className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-content/70 bg-content/[0.06] border border-content/[0.1] px-4 py-2 rounded-lg hover:bg-content/[0.1] transition-all"><UploadIcon className="w-3.5 h-3.5" />Browse Files</button>)}
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-content mb-1">Configure Analysis</h3>
            <p className="text-xs text-content/30 mb-5">Target variable (What are we predicting?)</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-content/50 mb-1.5">Target Variable</label>
                <div className="relative">
                  <select value={targetVar} onChange={(e) => setTargetVar(e.target.value)} className="w-full bg-background border border-content/[0.08] rounded-lg px-3 py-2.5 text-sm text-content/80 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-background text-foreground">Select target variable</option>
                    <option value="hired" className="bg-background text-foreground">hired</option>
                    <option value="approved" className="bg-background text-foreground">approved</option>
                    <option value="selected" className="bg-background text-foreground">selected</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content/30 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-content/50 mb-1.5">Protected Attributes (bias concern)</label>
                <div className="relative">
                  <select value={protectedAttr} onChange={(e) => setProtectedAttr(e.target.value)} className="w-full bg-background border border-content/[0.08] rounded-lg px-3 py-2.5 text-sm text-content/80 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-background text-foreground">Select protected attributes</option>
                    <option value="gender" className="bg-background text-foreground">gender</option>
                    <option value="race" className="bg-background text-foreground">race</option>
                    <option value="age" className="bg-background text-foreground">age</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content/30 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-content/50 mb-1.5">Prediction Column (optional)</label>
                <div className="relative">
                  <select value={prediction} onChange={(e) => setPrediction(e.target.value)} className="w-full bg-background border border-content/[0.08] rounded-lg px-3 py-2.5 text-sm text-content/80 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
                    <option value="" className="bg-background text-foreground">Upload predictions CSV (optional)</option>
                    <option value="prediction" className="bg-background text-foreground">prediction</option>
                    <option value="score" className="bg-background text-foreground">score</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content/30 pointer-events-none" />
                </div>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 bg-cta text-cta-foreground text-sm font-semibold px-5 py-3 rounded-xl transition-all hover:bg-cta/90 shadow-lg shadow-content/[0.05] mt-2">Analyze & Detect Bias<ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-content mb-1">About Your Data</h3>
            <p className="text-xs text-content/30 mb-5">Dataset summary and guidance</p>
            <div className="grid grid-cols-2 gap-4">{aboutItems.map((item) => (<div key={item.label} className={`bg-content/[0.02] border border-content/[0.06] rounded-lg p-4 ${item.label === "Tip" ? "col-span-2" : ""}`}><div className="flex items-center gap-2 mb-2"><item.icon className="w-3.5 h-3.5 text-content/50" /><span className="text-xs font-medium text-content/50">{item.label}</span></div><p className="text-sm text-content/70">{item.value}</p></div>))}</div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-sm font-semibold text-content mb-4">Quick Guide</h3>
            <div className="space-y-3">{["Upload a CSV file with your hiring/evaluation data", "Select the target variable you're predicting", "Choose which attributes may carry bias", "Run the analysis to detect disparities"].map((step, i) => (<div key={i} className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-content/[0.08] border border-content/[0.12] flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] font-bold text-content/70">{i + 1}</span></div><p className="text-sm text-content/50">{step}</p></div>))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
