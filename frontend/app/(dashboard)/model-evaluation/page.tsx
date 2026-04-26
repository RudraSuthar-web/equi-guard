"use client";

import { PageHeader, StatCard } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import {
  Target,
  Scale,
  Activity,
  ArrowRight,
  HelpCircle,
  Loader2,
  CloudUpload,
  Check,
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

import AppTour from "@/components/AppTour";
import { MODEL_EVALUATION_STEPS } from "@/lib/tour-steps";
import { useState } from "react";

export default function ModelEvaluationPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  const [tourRun, setTourRun] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>(null);

  // FILE STATES
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);

  const [datasetUploaded, setDatasetUploaded] = useState(false);
  const [outputUploaded, setOutputUploaded] = useState(false);

  // ============================
  // API CALL
  // ============================
  const handleCompare = async () => {
    if (!datasetFile || !outputFile) {
      alert("Upload both dataset and model output");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("dataset", datasetFile);
      formData.append("output", outputFile);

      const res = await fetch("http://localhost:8000/compare-model", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      setData(result);
    } catch (err) {
      console.error(err);
      alert("Comparison failed");
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="glass-card rounded-lg p-3 text-xs border border-content/10">
          <p>
            {label}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>Comparing model performance...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <AppTour
        steps={MODEL_EVALUATION_STEPS}
        run={tourRun}
        onFinish={() => setTourRun(false)}
      />

      <PageHeader
        title="Model Evaluation"
        description="Compare model predictions with actual dataset"
        action={
          <button onClick={() => setTourRun(true)}>
            <HelpCircle />
          </button>
        }
      />

      {/* ================= UPLOAD SECTION ================= */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Compare Model Output
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DATASET */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              setDatasetFile(f);
              setDatasetUploaded(true);
            }}
            className="border-2 border-dashed rounded-xl p-6 text-center"
          >
            <input
              hidden
              type="file"
              id="datasetUpload"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setDatasetFile(f);
                  setDatasetUploaded(true);
                }
              }}
            />

            <label htmlFor="datasetUpload" className="cursor-pointer">
              {datasetUploaded ? (
                <>
                  <Check className="mx-auto text-green-500 mb-2" />
                  <p className="text-sm">{datasetFile?.name}</p>
                  <p className="text-xs text-content/40">
                    Dataset
                  </p>
                </>
              ) : (
                <>
                  <CloudUpload className="mx-auto mb-2 text-content/50" />
                  <p>Upload Dataset</p>
                </>
              )}
            </label>
          </div>

          {/* OUTPUT */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              setOutputFile(f);
              setOutputUploaded(true);
            }}
            className="border-2 border-dashed rounded-xl p-6 text-center"
          >
            <input
              hidden
              type="file"
              id="outputUpload"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setOutputFile(f);
                  setOutputUploaded(true);
                }
              }}
            />

            <label htmlFor="outputUpload" className="cursor-pointer">
              {outputUploaded ? (
                <>
                  <Check className="mx-auto text-green-500 mb-2" />
                  <p className="text-sm">{outputFile?.name}</p>
                  <p className="text-xs text-content/40">
                    Model Output
                  </p>
                </>
              ) : (
                <>
                  <CloudUpload className="mx-auto mb-2 text-content/50" />
                  <p>Upload Model Output</p>
                </>
              )}
            </label>
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="mt-6 w-full bg-cta text-cta-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          Compare Model vs Actual
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ================= RESULTS ================= */}
      {!data ? null : (
        <>
          {/* METRICS */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard
                label="Overall Accuracy"
                value={data.stats.overallAccuracy}
                icon={Target}
              />
              <StatCard
                label="Balanced Accuracy"
                value={data.stats.balancedAccuracy}
                icon={Scale}
              />
              <StatCard
                label="AUC Score"
                value={data.stats.aucScore}
                icon={Activity}
              />
              <StatCard
                label="Fairness"
                value={data.overallFairness}
                icon={Scale}
              />
            </div>
          </div>

          {/* CHART */}
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="mb-4 font-semibold">
              Accuracy by Group
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.accuracyByGroup}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={`rgba(${cr},0.1)`}
                />
                <XAxis dataKey="group" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="accuracy"
                  fill="var(--primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* GAP + RECOMMENDATION */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="mb-4 font-semibold">
                Performance Gap
              </h3>
              <p className="text-4xl font-bold">
                {data.performanceGap}
              </p>
              <p className="text-sm text-content/40 mt-2">
                Gap between best and worst groups
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="mb-4 font-semibold">
                Recommendations
              </h3>

              {data.recommendations.map(
                (r: string, i: number) => (
                  <p key={i} className="text-sm mb-2">
                    • {r}
                  </p>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
