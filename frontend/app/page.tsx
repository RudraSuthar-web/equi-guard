"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Eye,
  Zap,
  FileText,
  Loader2,
} from "lucide-react";

type EvalResult = {
  original_score: number;
  shadow_score: number;
  bias_detected: boolean;
  bias_gap: number;
  verdict: string;
};

// Animated counter component
function AnimatedScore({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      start = Math.round(eased * end);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return (
    <span className={`text-5xl font-bold tracking-tight ${color}`}>
      {display}
    </span>
  );
}

// Radial progress ring
function ScoreRing({
  score,
  color,
  bgColor,
}: {
  score: number;
  color: string;
  bgColor: string;
}) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg
      className="w-32 h-32 -rotate-90"
      viewBox="0 0 120 120"
    >
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={bgColor}
        strokeWidth="8"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-[1200ms] ease-out"
      />
    </svg>
  );
}

export default function Home() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState<null | EvalResult>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const evaluate = async () => {
    setLoading(true);
    setResult(null);
    setShowResult(false);
    try {
      const res = await fetch("http://127.0.0.1:8000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resume }),
      });
      const data = await res.json();
      setResult(data);
      setTimeout(() => {
        setShowResult(true);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }, 50);
    } catch {
      alert("Backend not reachable. Make sure uvicorn is running.");
    }
    setLoading(false);
  };

  const charCount = resume.length;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background ambient effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Top-left glow */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-right glow */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(175, 175, 175, 0.4) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45, 45, 45, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-12 pb-20 max-w-5xl mx-auto">
        {/* Navigation / Brand Bar */}
        <nav className="w-full flex items-center justify-between mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              EquiGuard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Bias Detector
            </span>
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full hover:bg-indigo-500/15 transition-all">
              Dashboard
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </nav>

        {/* Hero section */}
        <div className="text-center mb-14 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Shadow-Twin Bias Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Detect Hiring Bias
            <br />
            <span className="gradient-text">Before It Causes Harm</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Paste a candidate's resume and our AI will compare scores with a
            demographic-neutral shadow twin to surface hidden bias.
          </p>
        </div>

        {/* Feature pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {[
            { icon: Eye, label: "Shadow-Twin Scoring" },
            { icon: BarChart3, label: "Bias Gap Analysis" },
            { icon: Zap, label: "Instant Results" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 cursor-default"
            >
              <f.icon className="w-3.5 h-3.5 text-indigo-400" />
              {f.label}
            </div>
          ))}
        </div>

        {/* Input Card */}
        <div
          className="w-full max-w-2xl animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <div className="glass-card rounded-2xl p-1">
            <div className="rounded-xl p-6 sm:p-8">
              {/* Label row */}
              <div className="flex items-center justify-between mb-4">
                <label
                  htmlFor="resume-input"
                  className="flex items-center gap-2 text-sm font-medium text-white"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Candidate Resume
                </label>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {charCount.toLocaleString()} chars
                </span>
              </div>

              {/* Textarea */}
              <div className="relative group">
                <textarea
                  id="resume-input"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 sm:p-5 text-sm text-white/90 h-52 resize-none placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-300 leading-relaxed"
                  placeholder="Paste the full resume text here…&#10;&#10;Include education, work experience, skills, and any other relevant information for the most accurate bias analysis."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between mt-5">
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Your data is processed locally and never stored.
                </p>
                <button
                  id="evaluate-button"
                  onClick={evaluate}
                  disabled={loading || !resume.trim()}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-white/[0.06] disabled:to-white/[0.06] disabled:text-white/30 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 disabled:shadow-none hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    <>
                      Evaluate Candidate
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        {result && showResult && (
          <div
            ref={resultRef}
            className="w-full max-w-2xl mt-10 animate-fade-in-up"
          >
            {/* Verdict Banner */}
            <div
              className={`glass-card rounded-2xl p-1 mb-6 ${
                result.bias_detected ? "glow-rose" : "glow-emerald"
              }`}
            >
              <div
                className={`rounded-xl px-6 py-5 flex items-center gap-4 ${
                  result.bias_detected
                    ? "bg-rose-500/[0.06] border border-rose-500/20"
                    : "bg-emerald-500/[0.06] border border-emerald-500/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    result.bias_detected
                      ? "bg-rose-500/15"
                      : "bg-emerald-500/15"
                  }`}
                >
                  {result.bias_detected ? (
                    <ShieldAlert className="w-6 h-6 text-rose-400" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  )}
                </div>
                <div>
                  <h2
                    className={`text-lg font-bold ${
                      result.bias_detected
                        ? "text-rose-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {result.bias_detected
                      ? "Bias Detected — Evaluation Flagged"
                      : "Pass — No Significant Bias Found"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {result.bias_detected
                      ? "Shadow-twin analysis revealed a significant scoring disparity."
                      : "Both evaluations produced consistent scores."}
                  </p>
                </div>
              </div>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Original Score */}
              <div
                className="glass-card glass-card-hover rounded-2xl p-6 text-center animate-score-reveal"
                style={{ animationDelay: "200ms", opacity: 0 }}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  Original Score
                </p>
                <div className="relative flex items-center justify-center mb-3">
                  <ScoreRing
                    score={result.original_score}
                    color="rgba(129, 140, 248, 0.7)"
                    bgColor="rgba(255,255,255,0.04)"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedScore
                      value={result.original_score}
                      color="text-indigo-300"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Candidate as-is
                </p>
              </div>

              {/* Shadow Score */}
              <div
                className="glass-card glass-card-hover rounded-2xl p-6 text-center animate-score-reveal"
                style={{ animationDelay: "400ms", opacity: 0 }}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  Shadow Twin
                </p>
                <div className="relative flex items-center justify-center mb-3">
                  <ScoreRing
                    score={result.shadow_score}
                    color="rgba(167, 139, 250, 0.7)"
                    bgColor="rgba(255,255,255,0.04)"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedScore
                      value={result.shadow_score}
                      color="text-violet-300"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Neutralized profile
                </p>
              </div>

              {/* Bias Gap */}
              <div
                className={`glass-card glass-card-hover rounded-2xl p-6 text-center animate-score-reveal ${
                  result.bias_detected ? "glow-rose" : "glow-emerald"
                }`}
                style={{ animationDelay: "600ms", opacity: 0 }}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  Bias Gap
                </p>
                <div className="relative flex items-center justify-center mb-3">
                  <ScoreRing
                    score={Math.min(result.bias_gap * 3, 100)}
                    color={
                      result.bias_detected
                        ? "rgba(251, 113, 133, 0.7)"
                        : "rgba(52, 211, 153, 0.7)"
                    }
                    bgColor="rgba(255,255,255,0.04)"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedScore
                      value={result.bias_gap}
                      color={
                        result.bias_detected
                          ? "text-rose-300"
                          : "text-emerald-300"
                      }
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Point difference
                </p>
              </div>
            </div>

            {/* Explanation Card */}
            <div
              className="glass-card rounded-2xl p-6 animate-fade-in-up"
              style={{ animationDelay: "800ms", opacity: 0 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    result.bias_detected
                      ? "bg-rose-500/10"
                      : "bg-emerald-500/10"
                  }`}
                >
                  {result.bias_detected ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {result.bias_detected
                      ? "What this means"
                      : "Evaluation Summary"}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.bias_detected
                      ? "The AI scored this candidate differently when demographic identifiers were removed or altered. This indicates the model may be relying on protected characteristics (such as name, gender, or ethnicity) rather than purely merit-based factors. We recommend reviewing and recalibrating the evaluation model."
                      : "The AI scored both the original and demographic-neutral versions of this resume consistently. No significant bias was detected in the evaluation, suggesting the model is assessing candidates on merit-based criteria."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
          <p className="text-xs text-muted-foreground/60">
            Built with transparency in mind · EquiGuard v1.0
          </p>
        </footer>
      </div>
    </main>
  );
}