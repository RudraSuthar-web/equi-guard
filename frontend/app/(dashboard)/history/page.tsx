"use client";

import { PageHeader } from "@/components/page-components";
import {
  Search,
  Filter,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const historyData = [
  {
    name: "Hiring_Data.csv",
    type: "Dataset + Model",
    scoreBefore: "0.72",
    scoreAfter: "0.24",
    status: "Improved",
    date: "11 May 2026",
  },
  {
    name: "Loan_Approval.csv",
    type: "Dataset",
    scoreBefore: "0.65",
    scoreAfter: "0.18",
    status: "Improved",
    date: "11 May 2026",
  },
  {
    name: "Admission_data.csv",
    type: "Dataset + Model",
    scoreBefore: "0.88",
    scoreAfter: "0.30",
    status: "Improved",
    date: "11 May 2026",
  },
  {
    name: "Healthcare_data.csv",
    type: "Dataset",
    scoreBefore: "0.45",
    scoreAfter: "0.21",
    status: "Reviewed",
    date: "12 May 2026",
  },
  {
    name: "Marketing_data.csv",
    type: "Dataset",
    scoreBefore: "0.32",
    scoreAfter: "0.12",
    status: "Improved",
    date: "12 May 2026",
  },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = historyData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="History"
        description="View and manage your previous analyses."
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
            <Filter className="w-3 h-3" />
            All Datasets
          </button>
          <button className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
            All Status
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Dataset Name", "Type", "Bias Score (Before → After)", "Status", "Date", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left text-[11px] font-medium text-white/40 uppercase tracking-wider px-5 py-4"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-white/80">
                      {row.name}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-white/40 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                      {row.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-rose-400">
                        {row.scoreBefore}
                      </span>
                      <ArrowRight className="w-3 h-3 text-white/20" />
                      <span className="text-sm font-semibold text-emerald-400">
                        {row.scoreAfter}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        row.status === "Improved"
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-amber-400 bg-amber-500/10"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/40">
                    {row.date}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all">
                        <Eye className="w-3.5 h-3.5 text-white/40" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-rose-500/10 flex items-center justify-center transition-all group">
                        <Trash2 className="w-3.5 h-3.5 text-white/40 group-hover:text-rose-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-white/30">
            Showing {filtered.length} of {historyData.length} analyses
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-white/40" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                  p === page
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                    : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(3, page + 1))}
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
