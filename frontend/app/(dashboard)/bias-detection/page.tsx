"use client";

import { PageHeader } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import {
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Loader2,
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

import AppTour from "@/components/AppTour";
import { BIAS_DETECTION_STEPS } from "@/lib/tour-steps";
import { useAuth } from "@/components/auth-context";
import { DEMO_USER_EMAIL } from "@/lib/constants";

export default function BiasDetectionPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  const { user } = useAuth();
  const isDemo = user?.email === DEMO_USER_EMAIL;

  const [tourRun, setTourRun] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [target, setTarget] = useState("");
  const [protectedCol, setProtectedCol] = useState("");

  const [data, setData] = useState<any>(null);

  // DEMO DATA
  useEffect(() => {
    if (isDemo) {
      setData({
        keyInsights: [
          "Females are less likely to be selected",
          "Selection rate differs by gender",
        ],
        biasMetricsSummary: [
          {
            name: "Disparate Impact",
            value: "0.62",
            threshold: "< 0.80",
            status: "fail",
          },
        ],
        topBiasedFeatures: [
          { name: "gender", severity: 0.92 },
          { name: "experience", severity: 0.66 },
        ],
        selectionRateData: [
          { name: "Male", value: 72 },
          { name: "Female", value: 45 },
        ],
        biasScore: 0.72,
        biasStatus: "High Bias Detected",
      });
    }
  }, [isDemo]);

  // API CALL
  const handleAnalyze = async () => {
    if (!file || !target || !protectedCol) {
      alert("Upload file and fill all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("target", target);
      formData.append("protected", protectedCol);

      const res = await fetch("http://localhost:8000/bias", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      const colors = [
        "#6366f1",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
      ];

      const chartData = result.selectionRateData.map(
        (item: any, i: number) => ({
          ...item,
          color: colors[i % colors.length],
        })
      );

      setData({
        ...result,
        selectionRateData: chartData,
      });
    } catch (err) {
      alert("Backend failed");
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-black text-white text-xs px-3 py-2 rounded">
          {payload[0].name}: {payload[0].value}%
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>Analyzing bias...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <AppTour
        steps={BIAS_DETECTION_STEPS}
        run={tourRun}
        onFinish={() => setTourRun(false)}
      />

      <PageHeader
        title="Bias Detection"
        description="Advanced fairness analysis"
        action={
          <button onClick={() => setTourRun(true)}>
            <HelpCircle />
          </button>
        }
      />

      {/* ================= UPLOAD + CONFIG ================= */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Upload */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Upload Dataset</h3>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              setFile(f);
              setUploaded(true);
            }}
            className={`border-2 border-dashed p-10 text-center rounded-xl ${
              dragOver ? "border-blue-500" : ""
            }`}
          >
            <input
              hidden
              type="file"
              id="file"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setUploaded(true);
                }
              }}
            />

            <label htmlFor="file">
              {uploaded ? (
                <>
                  <Check className="mx-auto mb-2 text-green-500" />
                  {file?.name}
                </>
              ) : (
                <>
                  <CloudUpload className="mx-auto mb-2" />
                  Upload CSV
                </>
              )}
            </label>
          </div>
        </div>

        {/* Config */}
        <div className="glass-card p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">Configuration</h3>

            <input
              placeholder="Target Column"
              className="w-full mb-3 p-3 border rounded"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />

            <input
              placeholder="Protected Column"
              className="w-full p-3 border rounded"
              value={protectedCol}
              onChange={(e) =>
                setProtectedCol(e.target.value)
              }
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-6 bg-blue-600 text-white py-3 rounded-xl"
          >
            Analyze Bias →
          </button>
        </div>
      </div>

      {/* ================= RESULTS ================= */}
      {!data ? (
        <div className="text-center mt-10">
          <ShieldAlert className="mx-auto mb-2" />
          Upload & analyze to see results
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {/* SCORE + METRICS */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Score */}
            <div className="glass-card p-6 rounded-xl flex items-center gap-6">
              <div className="relative">
                <svg className="w-28 h-28 -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="gray"
                    strokeWidth="8"
                    fill="none"
                    opacity={0.2}
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="blue"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={314}
                    strokeDashoffset={
                      314 * (1 - data.biasScore)
                    }
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {(data.biasScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div>
                <p>{data.biasStatus}</p>
                <h3 className="font-bold text-lg">
                  Bias Score
                </h3>
              </div>
            </div>

            {/* Metrics */}
            <div className="glass-card p-6 rounded-xl">
              <h3 className="mb-4 font-semibold">
                Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {data.biasMetricsSummary.map(
                  (m: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-100 rounded"
                    >
                      <p className="text-xs">{m.name}</p>
                      <p className="font-bold">
                        {m.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">
              Selection Rate
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.selectionRateData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {data.selectionRateData.map(
                    (e: any, i: number) => (
                      <Cell key={i} fill={e.color} />
                    )
                  )}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* INSIGHTS */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="mb-4 font-semibold">
              Insights
            </h3>

            {data.keyInsights.map(
              (i: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <AlertTriangle />
                  {i}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
