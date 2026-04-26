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
  Loader2,
} from "lucide-react";

import { useState } from "react";

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  // ========================================
  // ANALYZE
  // ========================================
  const handleAnalyze = async () => {
  if (!file) {
    alert("Upload file first");
    return;
  }

  setAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("file", file);   // MUST be 'file'

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);

  } catch (error) {
    console.error(error);
    alert("Backend connection failed");
  } finally {
    setAnalyzing(false);
  }
};

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <PageHeader
        title="Upload & Analyze"
        description="Upload your dataset and get instant analysis."
      />

      {/* UPLOAD BOX */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex gap-1 mb-4">
          {["Upload Data", "Analyze", "Complete"].map((step, i) => (
            <span
              key={step}
              className={`text-[13px] md:text-[11px] font-medium px-2.5 py-1 rounded-full ${
                i === 0
                  ? "bg-content/[0.1] text-content border border-content/[0.15]"
                  : "text-content/25 bg-content/[0.03] border border-content/[0.04]"
              }`}
            >
              {step}
            </span>
          ))}
        </div>

        {/* DROP ZONE */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);

            const droppedFile = e.dataTransfer.files[0];

            if (droppedFile) {
              setFile(droppedFile);
              setUploaded(true);
            }
          }}
          className={`border-2 border-dashed rounded-xl py-12 px-4 sm:py-24 sm:px-12 text-center transition-all duration-300 cursor-pointer ${
            dragOver
              ? "border-primary/50 bg-content/[0.03]"
              : uploaded
              ? "border-content/20 bg-content/[0.02]"
              : "border-primary/30 hover:border-primary/50 hover:bg-content/[0.02]"
          }`}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            hidden
            id="fileUpload"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (selected) {
                setFile(selected);
                setUploaded(true);
              }
            }}
          />

          <label htmlFor="fileUpload" className="cursor-pointer">
            <div
              className={`w-20 h-20 rounded-[3rem] mx-auto mb-4 flex items-center justify-center ${
                uploaded ? "bg-content/[0.08]" : "bg-content/[0.06]"
              }`}
            >
              {uploaded ? (
                <Check className="w-12 h-12 text-content/70" />
              ) : (
                <CloudUpload className="w-12 h-12 text-content/60" />
              )}
            </div>

            <p className="text-lg md:text-md font-medium text-content/70 mb-1">
              {uploaded ? file?.name : "Drag & drop your file here"}
            </p>

            <p className="text-md md:text-sm text-content/30">
              CSV / Excel files up to 100MB
            </p>

            {!uploaded && (
              <button className="mt-4 inline-flex items-center gap-2 text-md font-medium text-content/70 bg-content/[0.06] border border-content/[0.1] px-4 py-2 rounded-lg hover:bg-content/[0.1] transition-all">
                <UploadIcon className="w-3.5 h-3.5" />
                Browse Files
              </button>
            )}
          </label>
        </div>
      </div>

      {/* BUTTON */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <button
          onClick={handleAnalyze}
          disabled={analyzing || !uploaded}
          className="w-full inline-flex items-center justify-center gap-2 bg-cta text-cta-foreground text-lg md:text-md font-semibold px-5 py-3 rounded-xl transition-all hover:bg-cta/90 shadow-lg shadow-content/[0.05] disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze Dataset
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Before Clean</h3>

              <div className="space-y-2 text-content/70">
                <p>
                  Duplicate Rows:{" "}
                  {result.before_clean.duplicate_rows}
                </p>
                <p>
                  Rows With Missing Values:{" "}
                  {
                    result.before_clean
                      .rows_with_missing_values
                  }
                </p>
                <p>
                  Total Missing Cells:{" "}
                  {result.before_clean.total_missing_cells}
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">After Clean</h3>

              <div className="space-y-2 text-content/70">
                <p>
                  Duplicate Rows:{" "}
                  {result.after_clean.duplicate_rows}
                </p>
                <p>
                  Rows With Missing Values:{" "}
                  {
                    result.after_clean
                      .rows_with_missing_values
                  }
                </p>
                <p>
                  Total Missing Cells:{" "}
                  {result.after_clean.total_missing_cells}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Dataset Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-content/[0.02] border border-content/[0.06] rounded-lg p-4">
                <FileText className="w-4 h-4 mb-2 text-content/50" />
                <span className="text-xs text-content/50">
                  Rows
                </span>
                <p>{result.file_info.rows}</p>
              </div>

              <div className="bg-content/[0.02] border border-content/[0.06] rounded-lg p-4">
                <Columns className="w-4 h-4 mb-2 text-content/50" />
                <span className="text-xs text-content/50">
                  Columns
                </span>
                <p>{result.file_info.columns}</p>
              </div>

              <div className="bg-content/[0.02] border border-content/[0.06] rounded-lg p-4">
                <HardDrive className="w-4 h-4 mb-2 text-content/50" />
                <span className="text-xs text-content/50">
                  Size
                </span>
                <p>{result.file_info.size_kb} KB</p>
              </div>

              <div className="bg-content/[0.02] border border-content/[0.06] rounded-lg p-4 sm:col-span-3">
                <Lightbulb className="w-4 h-4 mb-2 text-content/50" />
                <span className="text-xs text-content/50">
                  Columns Found
                </span>
                <p className="text-sm text-content/70 break-words">
                  {result.column_names.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
