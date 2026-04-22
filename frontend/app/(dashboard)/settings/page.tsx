"use client";

import { PageHeader } from "@/components/page-components";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Sliders,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Save,
  Globe,
  Bell,
} from "lucide-react";

export default function SettingsPage() {
  const [threshold, setThreshold] = useState(0.8);
  const [autoFix, setAutoFix] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [synthesize, setSynthesize] = useState(false);
  const [language, setLanguage] = useState("en");

  const Toggle = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-indigo-500" : "bg-white/[0.1]"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Settings"
        description="Configure your preferences and analysis options."
        action={
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        }
      />

      <div className="space-y-6">
        {/* Analysis Settings */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">
              Analysis Settings
            </h3>
          </div>

          {/* Fairness Threshold */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Fairness Threshold
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  Minimum fairness score to pass analysis
                </p>
              </div>
              <span className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                {threshold.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(99,102,241,0.7) 0%, rgba(99,102,241,0.7) ${
                  threshold * 100
                }%, rgba(255,255,255,0.06) ${threshold * 100}%, rgba(255,255,255,0.06) 100%)`,
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-white/20">0.0</span>
              <span className="text-[10px] text-white/20">1.0</span>
            </div>
          </div>

          {/* Bias Threshold */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Bias Threshold
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  Maximum acceptable bias gap
                </p>
              </div>
              <span className="text-sm font-semibold text-white/50 bg-white/[0.04] px-3 py-1 rounded-lg border border-white/[0.06]">
                0.10
              </span>
            </div>
          </div>
        </div>

        {/* Auto-fix Options */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">
              Auto-fix Options
            </h3>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Enable Auto-Fix Recommendations
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  Automatically suggest bias mitigation strategies
                </p>
              </div>
              <Toggle enabled={autoFix} onToggle={() => setAutoFix(!autoFix)} />
            </div>

            <div className="border-t border-white/[0.04]" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Enable Data Synthesis
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  Allow automatic synthetic data generation
                </p>
              </div>
              <Toggle
                enabled={synthesize}
                onToggle={() => setSynthesize(!synthesize)}
              />
            </div>

            <div className="border-t border-white/[0.04]" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">
                  Enable Messaging Suggestions
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  Show suggestions for improved communication
                </p>
              </div>
              <Toggle
                enabled={notifications}
                onToggle={() => setNotifications(!notifications)}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Preferences</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Default Model
              </label>
              <select className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all appearance-none">
                <option>EquiGuard v2.0 (Default)</option>
                <option>EquiGuard v1.5 (Legacy)</option>
                <option>Custom Model</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card rounded-xl p-6 border-rose-500/10">
          <h3 className="text-sm font-semibold text-rose-400 mb-4">
            Danger Zone
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/70">
                Reset All Settings
              </p>
              <p className="text-xs text-white/30 mt-0.5">
                This will restore all settings to their default values
              </p>
            </div>
            <button className="text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-4 py-2 rounded-lg transition-all">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
