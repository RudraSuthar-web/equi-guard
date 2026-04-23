"use client";

import { PageHeader } from "@/components/page-components";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";
import { Sliders, RefreshCw, Save, Globe, Sun, Moon, Monitor } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [threshold, setThreshold] = useState(0.8);
  const [autoFix, setAutoFix] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [synthesize, setSynthesize] = useState(false);
  const [language, setLanguage] = useState("en");

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition-all duration-300 ${enabled ? "bg-cta" : "bg-content/[0.1]"}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full shadow-md transition-all duration-300 ${enabled ? "left-6 bg-cta-foreground" : "left-1 bg-content/60"}`} />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" description="Configure your preferences and analysis options."
        action={<button className="inline-flex items-center gap-2 bg-cta text-cta-foreground text-sm font-semibold px-4 py-2.5 md:px-5 md:py-2.5 rounded-xl transition-all hover:bg-cta/90 shadow-lg shadow-content/[0.05]"><Save className="w-4 h-4" /></button>}
      />
      <div className="space-y-6">
        {/* Appearance */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sun className="w-4 h-4 text-content/60" />
            <h3 className="text-sm font-semibold text-content">Appearance</h3>
          </div>
          <p className="text-xs text-content/30 mb-4">Choose your preferred theme</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme("dark")}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${theme === "dark" ? "border-content/40 bg-content/[0.06]" : "border-content/[0.08] hover:border-content/20 bg-content/[0.02]"}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-content">Dark</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-content/[0.06]">
                <div className="h-16 bg-[#0a0a0a] p-2 flex gap-1.5">
                  <div className="w-6 h-full rounded bg-[#1a1a1a]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-white/10" />
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                    <div className="h-2 w-2/3 rounded bg-white/10" />
                  </div>
                </div>
              </div>
              {theme === "dark" && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-content" />}
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${theme === "light" ? "border-content/40 bg-content/[0.06]" : "border-content/[0.08] hover:border-content/20 bg-content/[0.02]"}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#fafafa] border border-black/10 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-black" />
                </div>
                <span className="text-sm font-semibold text-content">Light</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-content/[0.06]">
                <div className="h-16 bg-[#fafafa] p-2 flex gap-1.5">
                  <div className="w-6 h-full rounded bg-[#e8e8e8]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-black/10" />
                    <div className="h-2 w-1/2 rounded bg-black/10" />
                    <div className="h-2 w-2/3 rounded bg-black/10" />
                  </div>
                </div>
              </div>
              {theme === "light" && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-content" />}
            </button>
          </div>
        </div>

        {/* Analysis Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6"><Sliders className="w-4 h-4 text-content/60" /><h3 className="text-sm font-semibold text-content">Analysis Settings</h3></div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-sm font-medium text-content/70">Fairness Threshold</p><p className="text-xs text-content/30 mt-0.5">Minimum fairness score to pass analysis</p></div>
              <span className="text-sm font-semibold text-content/80 bg-content/[0.06] px-3 py-1 rounded-lg border border-content/[0.08]">{threshold.toFixed(2)}</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, rgba(var(--content-rgb),0.6) 0%, rgba(var(--content-rgb),0.6) ${threshold * 100}%, rgba(var(--content-rgb),0.06) ${threshold * 100}%, rgba(var(--content-rgb),0.06) 100%)` }} />
            <div className="flex items-center justify-between mt-2"><span className="text-[10px] text-content/20">0.0</span><span className="text-[10px] text-content/20">1.0</span></div>
          </div>
          <div><div className="flex items-center justify-between mb-2"><div><p className="text-sm font-medium text-content/70">Bias Threshold</p><p className="text-xs text-content/30 mt-0.5">Maximum acceptable bias gap</p></div><span className="text-sm font-semibold text-content/50 bg-content/[0.04] px-3 py-1 rounded-lg border border-content/[0.06]">0.10</span></div></div>
        </div>

        {/* Auto-fix Options */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6"><RefreshCw className="w-4 h-4 text-content/60" /><h3 className="text-sm font-semibold text-content">Auto-fix Options</h3></div>
          <div className="space-y-5">
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-content/70">Enable Auto-Fix Recommendations</p><p className="text-xs text-content/30 mt-0.5">Automatically suggest bias mitigation strategies</p></div><Toggle enabled={autoFix} onToggle={() => setAutoFix(!autoFix)} /></div>
            <div className="border-t border-content/[0.04]" />
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-content/70">Enable Data Synthesis</p><p className="text-xs text-content/30 mt-0.5">Allow automatic synthetic data generation</p></div><Toggle enabled={synthesize} onToggle={() => setSynthesize(!synthesize)} /></div>
            <div className="border-t border-content/[0.04]" />
            <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-content/70">Enable Messaging Suggestions</p><p className="text-xs text-content/30 mt-0.5">Show suggestions for improved communication</p></div><Toggle enabled={notifications} onToggle={() => setNotifications(!notifications)} /></div>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6"><Globe className="w-4 h-4 text-content/60" /><h3 className="text-sm font-semibold text-content">Preferences</h3></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-content/70 mb-1.5">Language</label><select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-content/[0.03] border border-content/[0.08] rounded-lg px-3 py-2.5 text-sm text-content/80 focus:outline-none focus:border-content/30 focus:ring-2 focus:ring-content/10 transition-all appearance-none"><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="de">Deutsch</option></select></div>
            <div><label className="block text-sm font-medium text-content/70 mb-1.5">Default Model</label><select className="w-full bg-content/[0.03] border border-content/[0.08] rounded-lg px-3 py-2.5 text-sm text-content/80 focus:outline-none focus:border-content/30 focus:ring-2 focus:ring-content/10 transition-all appearance-none"><option>EquiGuard v2.0 (Default)</option><option>EquiGuard v1.5 (Legacy)</option><option>Custom Model</option></select></div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card rounded-xl p-6 border-content/[0.08]">
          <h3 className="text-sm font-semibold text-content/80 mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-content/70">Reset All Settings</p><p className="text-xs text-content/30 mt-0.5">This will restore all settings to their default values</p></div><button className="text-xs font-medium text-content/70 bg-content/[0.08] hover:bg-content/[0.12] border border-content/[0.12] px-4 py-2 rounded-lg transition-all">Reset</button></div>
        </div>
      </div>
    </div>
  );
}
