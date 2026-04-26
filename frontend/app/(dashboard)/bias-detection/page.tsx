"use client";

import { PageHeader } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import {
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Eye,
  Filter,
  Upload,
  Check,
  CloudUpload,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { HelpCircle, Loader2 } from "lucide-react";
import AppTour from "@/components/AppTour";
import { BIAS_DETECTION_STEPS } from "@/lib/tour-steps";

export default function BiasDetectionPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  const [tourRun, setTourRun] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [target, setTarget] = useState("");
  const [protectedCol, setProtectedCol] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  // ==========================================
  // API CALL
  // ==========================================
  const runBiasDetection = async () => {
    if (!file || !target || !protectedCol) {
      alert("Please upload file and enter Target + Protected column");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", target);
      formData.append("protected", protectedCol);

      const response = await fetch("http://127.0.0.1:8000/bias", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        alert(result.error);
        setLoading(false);
        return;
      }

      setData(result);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card rounded-lg p-3 text-xs border border-content/10">
          <p className="text-content font-medium">
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AppTour
        steps={BIAS_DETECTION_STEPS}
        run={tourRun}
        onFinish={() => setTourRun(false)}
      />

      {/* HEADER */}
      <div className="tour-detection-header">
        <PageHeader
          title="Bias Detection"
          description="Detailed bias analysis results and fairness metrics."
          action={
            <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-end">
              <button
                onClick={() => setTourRun(true)}
                className="group p-2 rounded-2xl bg-content/[0.04] border border-content/[0.08]"
              >
                <HelpCircle className="w-5 h-5 text-content/40" />
              </button>

              <button className="inline-flex items-center gap-2 text-sm text-content/50 bg-content/[0.04] border border-content/[0.08] px-3 py-2 rounded-lg">
                <Filter className="w-4 h-4" />
                Group
              </button>

              <button className="inline-flex items-center gap-2 text-sm text-content/50 bg-content/[0.04] border border-content/[0.08] px-3 py-2 rounded-lg">
                <Eye className="w-4 h-4" />
                View
              </button>
            </div>
          }
        />
      </div>

      {/* UPLOAD SECTION */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-content mb-4">
          Upload Dataset
        </h3>

        {/* file upload */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);

            const dropped = e.dataTransfer.files[0];

            if (dropped) {
              setFile(dropped);
              setUploaded(true);
            }
          }}
          className={`border-2 border-dashed rounded-xl py-10 px-6 text-center mb-5 transition-all ${
            dragOver
              ? "border-primary bg-content/[0.04]"
              : "border-content/20"
          }`}
        >
          <input
            hidden
            type="file"
            id="upload"
            accept=".csv"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (selected) {
                setFile(selected);
                setUploaded(true);
              }
            }}
          />

          <label htmlFor="upload" className="cursor-pointer">
            {uploaded ? (
              <>
                <Check className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p className="text-content font-medium">{file?.name}</p>
              </>
            ) : (
              <>
                <CloudUpload className="w-12 h-12 mx-auto mb-3 text-content/50" />
                <p className="text-content font-medium">
                  Drag & Drop CSV File
                </p>

                <p className="text-content/40 text-sm mb-4">
                  or click to browse
                </p>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-content/[0.05] border border-content/[0.08] text-content/60">
                  <Upload className="w-4 h-4" />
                  Browse File
                </span>
              </>
            )}
          </label>
        </div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Target Column"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-content/[0.03] border border-content/[0.08] outline-none"
          />

          <input
            type="text"
            placeholder="Enter Protected Column"
            value={protectedCol}
            onChange={(e) => setProtectedCol(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-content/[0.03] border border-content/[0.08] outline-none"
          />
        </div>

        <button
          onClick={runBiasDetection}
          disabled={loading}
          className="w-full rounded-xl py-3 bg-primary text-white font-semibold"
        >
          {loading ? "Analyzing..." : "Run Bias Detection"}
        </button>
      </div>

      {/* SHOW RESULTS */}
      {!data ? (
        <div className="glass-card rounded-xl p-10 text-center">
          <ShieldAlert className="w-10 h-10 mx-auto text-content/30 mb-3" />
          <p className="text-content/50">
            Upload file and run analysis
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* SCORE */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg
                    className="w-28 h-28 -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={`rgba(${cr},0.08)`}
                      strokeWidth="8"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 52 * (1 - data.biasScore)
                      }`}
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-content">
                      {data.biasScore}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-content/60 mb-2">
                    {data.biasStatus}
                  </p>

                  <h3 className="text-xl font-bold text-content">
                    Bias Score
                  </h3>
                </div>
              </div>
            </div>

            {/* PIE */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-content mb-4">
                Selection Rate by Group
              </h3>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.selectionRateData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={85}
                    >
                      {data.selectionRateData.map(
                        (entry: any, index: number) => (
                          <Cell
                            key={index}
                            fill={
                              entry.color ||
                              "var(--primary)"
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* INSIGHTS */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-content mb-4">
                Key Insights
              </h3>

              <div className="space-y-3">
                {data.keyInsights.map(
                  (item: string, i: number) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start"
                    >
                      <AlertTriangle className="w-4 h-4 text-content/50 mt-1" />

                      <p className="text-content/60 text-sm">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <button className="w-full glass-card rounded-xl p-4 flex justify-between items-center">
              <span className="text-content/60">
                View Full Analysis
              </span>

              <ArrowRight className="w-4 h-4 text-content/40" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
