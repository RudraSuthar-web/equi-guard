"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import {
  Shield, ArrowRight, Sparkles, Eye, BarChart3, Zap,
  ShieldCheck, Lock, ChevronRight, Globe, Layers, Brain,
} from "lucide-react";

const features = [
  { icon: Eye, title: "Shadow-Twin Analysis", description: "Compare automated decisions against demographic-neutral profiles to uncover hidden scoring disparities." },
  { icon: Brain, title: "AI-Powered Detection", description: "Deep learning models analyze patterns across critical decision paths to identify systemic bias." },
  { icon: BarChart3, title: "Comprehensive Reports", description: "Generate detailed fairness audits for loans, hiring, and healthcare models with actionable insights." },
  { icon: Zap, title: "Real-Time Monitoring", description: "Continuous monitoring of automated systems with instant alerts when fairness thresholds are breached." },
  { icon: Layers, title: "Data Synthesis", description: "Generate balanced, synthetic datasets to retrain fairer models for any decision-making use case." },
  { icon: Lock, title: "Privacy-First", description: "All analysis runs locally. Sensitive decision data is never stored, shared, or transmitted to third parties." },
];

const stats = [
  { value: "99.2%", label: "Detection Accuracy" },
  { value: "66.7%", label: "Avg. Disparity Reduction" },
  { value: "<2s", label: "Analysis Speed" },
  { value: "50k+", label: "Resumes Processed" },
];

const steps = [
  { number: "01", title: "Upload Dataset", description: "Import your hiring data, candidate resumes, or evaluation scores in any standard format." },
  { number: "02", title: "Detect Bias", description: "Our AI runs shadow-twin analysis, statistical parity checks, and multi-dimensional fairness audits." },
  { number: "03", title: "Take Action", description: "Get clear, actionable recommendations with synthesized data to retrain fairer models." },
];

export default function LandingPage() {
  const { contentRgb } = useTheme();
  const cr = contentRgb;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-20 blur-[150px]" style={{ background: `radial-gradient(circle, rgba(${cr},0.12) 0%, transparent 70%)` }} />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(circle, rgba(${cr},0.1) 0%, transparent 70%)` }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(rgba(${cr},0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${cr},0.1) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cta flex items-center justify-center shadow-lg shadow-content/[0.05]"><Shield className="w-5 h-5 text-cta-foreground" /></div>
            <span className="text-lg font-semibold tracking-tight text-content">EquiGuard</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-content/50 hover:text-content/80 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-content/50 hover:text-content/80 transition-colors">How It Works</a>
            <a href="#stats" className="text-sm text-content/50 hover:text-content/80 transition-colors">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-content/70 hover:text-content transition-colors px-4 py-2">Sign In</Link>
            <Link href="/login?mode=signup" className="inline-flex items-center gap-1.5 text-sm font-semibold bg-cta text-cta-foreground px-5 py-2.5 rounded-xl hover:bg-cta/90 transition-all shadow-lg shadow-content/[0.05] hover:-translate-y-0.5">Get Started<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-content/60 bg-content/[0.06] border border-content/[0.1] px-4 py-1.5 rounded-full mb-8 animate-fade-in-up"><Sparkles className="w-3.5 h-3.5" />Unbiased AI Decision Platform</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-content mb-6 leading-[1.05] animate-fade-in-up" style={{ animationDelay: "100ms" }}>Fair Decisions Start<br /><span className="gradient-text">With Unbiased AI</span></h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>EquiGuard detects and eliminates bias in automated systems—from bank loans to hiring and healthcare. We ensure every decision is based on merit, not flawed historical data.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Link href="/login?mode=signup" className="group inline-flex items-center gap-2.5 bg-cta text-cta-foreground font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-content/[0.08] hover:-translate-y-0.5 hover:shadow-xl">Start Fairness Audit<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" /></Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 text-sm font-medium text-content/60 hover:text-content/90 border border-content/[0.1] hover:border-content/[0.2] px-6 py-3.5 rounded-xl transition-all duration-300 hover:bg-content/[0.03]">See How It Works<ChevronRight className="w-4 h-4" /></a>
          </div>

          {/* Hero visual mockup */}
          <div className="mt-16 lg:mt-20 relative animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            <div className="glass-card rounded-2xl p-1 max-w-3xl mx-auto">
              <div className="rounded-xl bg-content/[0.02] border border-content/[0.04] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-content/[0.08]" /><div className="w-3 h-3 rounded-full bg-content/[0.08]" /><div className="w-3 h-3 rounded-full bg-content/[0.08]" /></div>
                  <div className="flex-1 h-7 rounded-lg bg-content/[0.04] flex items-center px-3"><span className="text-[11px] text-content/25 font-mono">equiguard.ai/fairness-report</span></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[{ label: "Decision Bias", value: "0.12", status: "Low" }, { label: "Parity Gap", value: "88.2%", status: "Resolved" }, { label: "Audit Status", value: "Compliant", status: "✓" }].map((item) => (
                    <div key={item.label} className="rounded-xl bg-content/[0.03] border border-content/[0.06] p-4 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-content/30 mb-2">{item.label}</p>
                      <p className="text-xl font-bold text-content/80 mb-1">{item.value}</p>
                      <span className="text-[10px] text-content/40 bg-content/[0.05] px-2 py-0.5 rounded-full">{item.status}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">{[...Array(7)].map((_, i) => (<div key={i} className="flex-1 flex flex-col justify-end h-16 gap-1"><div className="w-full rounded-sm bg-content/[0.08]" style={{ height: `${30 + Math.sin(i) * 20 + 20}%` }} /><div className="w-full rounded-sm bg-content/[0.2]" style={{ height: `${50 + Math.cos(i) * 15 + 15}%` }} /></div>))}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section id="stats" className="relative z-10 py-16 border-y border-content/[0.06]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (<div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}><p className="text-3xl sm:text-4xl font-bold text-content mb-2 tracking-tight">{stat.value}</p><p className="text-sm text-content/40">{stat.label}</p></div>))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-content/60 bg-content/[0.06] border border-content/[0.1] px-4 py-1.5 rounded-full mb-6"><Globe className="w-3.5 h-3.5" />Cross-Industry Auditing</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-content tracking-tight mb-4">Everything You Need for<br /><span className="gradient-text">Unbiased Automated Decisions</span></h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">Inspect datasets and software models for hidden discrimination across finance, HR, and medical systems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (<div key={feature.title} className="glass-card glass-card-hover rounded-2xl p-6 animate-fade-in-up group cursor-default" style={{ animationDelay: `${i * 80}ms` }}><div className="w-11 h-11 rounded-xl bg-content/[0.06] flex items-center justify-center mb-5 group-hover:bg-content/[0.1] transition-colors"><feature.icon className="w-5 h-5 text-content/60 group-hover:text-content/80 transition-colors" /></div><h3 className="text-sm font-semibold text-content mb-2">{feature.title}</h3><p className="text-sm text-content/40 leading-relaxed">{feature.description}</p></div>))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-24 lg:py-32 px-6 lg:px-12 border-t border-content/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-content/60 bg-content/[0.06] border border-content/[0.1] px-4 py-1.5 rounded-full mb-6"><Zap className="w-3.5 h-3.5" />Simple Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-content tracking-tight mb-4">Three Steps to<br /><span className="gradient-text">Unbiased Systems</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (<div key={step.number} className="relative glass-card rounded-2xl p-8 text-center animate-fade-in-up group" style={{ animationDelay: `${i * 150}ms` }}><div className="text-5xl font-black text-content/[0.06] mb-4 group-hover:text-content/[0.1] transition-colors">{step.number}</div><h3 className="text-base font-semibold text-content mb-3">{step.title}</h3><p className="text-sm text-content/40 leading-relaxed">{step.description}</p>{i < steps.length - 1 && (<div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10"><ChevronRight className="w-5 h-5 text-content/15" /></div>)}</div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at 50% 50%, rgba(${cr},0.5) 0%, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-cta flex items-center justify-center mx-auto mb-6 shadow-lg shadow-content/[0.05]"><ShieldCheck className="w-7 h-7 text-cta-foreground" /></div>
              <h2 className="text-3xl sm:text-4xl font-bold text-content tracking-tight mb-4">Ready to Build Fairer Systems?</h2>
              <p className="text-base text-content/40 max-w-md mx-auto mb-8 leading-relaxed">Join organizations using EquiGuard to audit, detect, and mitigate bias before their systems impact real people.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login?mode=signup" className="group inline-flex items-center gap-2.5 bg-cta text-cta-foreground font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-content/[0.08] hover:-translate-y-0.5">Create Free Account<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></Link>
                <Link href="/login" className="text-sm font-medium text-content/50 hover:text-content/80 transition-colors">Already have an account? Sign in →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-content/[0.06] py-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-cta flex items-center justify-center"><Shield className="w-4 h-4 text-cta-foreground" /></div><span className="text-sm font-semibold text-content/70">EquiGuard</span></div>
          <p className="text-xs text-content/30">© {new Date().getFullYear()} EquiGuard. Built with transparency in mind.</p>
          <div className="flex items-center gap-6"><a href="#" className="text-xs text-content/30 hover:text-content/60 transition-colors">Privacy</a><a href="#" className="text-xs text-content/30 hover:text-content/60 transition-colors">Terms</a><a href="#" className="text-xs text-content/30 hover:text-content/60 transition-colors">Contact</a></div>
        </div>
      </footer>
    </main>
  );
}