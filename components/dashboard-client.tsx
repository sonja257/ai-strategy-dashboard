"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import type { Interviewee, Theme, Risk, Recommendation } from "@/db/schema";
import {
  MATURITY_CONFIG,
  STATUS_CONFIG,
  SEVERITY_CONFIG,
  PRIORITY_CONFIG,
  DEPT_COLORS,
  formatDate,
} from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

interface Props {
  interviewees: Interviewee[];
  themes: Theme[];
  risks: Risk[];
  recommendations: Recommendation[];
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    scheduled: number;
    avgMaturity: number;
  };
  orgBreakdown: Record<string, { total: number; completed: number }>;
  maturityDistribution: Record<string, number>;
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomBarTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; payload?: { color?: string } }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-xl"
      style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250", color: "#e2e8f0" }}
    >
      <p className="font-medium mb-1" style={{ color: "#a78bfa" }}>{label}</p>
      <p>
        <span style={{ color: "#94a3b8" }}>Mentions: </span>
        <span style={{ color: "#00d4aa" }} className="font-semibold">{payload[0].value}</span>
      </p>
    </div>
  );
}

function CustomRadarTooltip({ active, payload }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-xl"
      style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250", color: "#e2e8f0" }}
    >
      {payload.map((entry, i) => (
        <p key={i}>
          <span style={{ color: "#94a3b8" }}>{entry.name}: </span>
          <span className="font-semibold" style={{ color: "#6c63ff" }}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

// ── Radar Data (hardcoded thematic dept scores) ───────────────────────────────

const RADAR_DATA = [
  { axis: "Automation", Engineering: 4.2, Sales: 2.8, Marketing: 3.1, "HR/Ops": 2.4 },
  { axis: "Data/Analytics", Engineering: 4.5, Sales: 2.5, Marketing: 3.0, "HR/Ops": 2.0 },
  { axis: "CX", Engineering: 3.0, Sales: 3.5, Marketing: 3.8, "HR/Ops": 2.6 },
  { axis: "Knowledge", Engineering: 3.2, Sales: 2.9, Marketing: 3.4, "HR/Ops": 2.8 },
  { axis: "Governance", Engineering: 2.8, Sales: 1.9, Marketing: 2.2, "HR/Ops": 1.8 },
  { axis: "Product Dev", Engineering: 4.8, Sales: 2.0, Marketing: 2.5, "HR/Ops": 1.5 },
];

const RADAR_DEPT_COLORS = {
  Engineering: "#6c63ff",
  Sales: "#00d4aa",
  Marketing: "#f472b6",
  "HR/Ops": "#ffd166",
};

// ── Tab strip ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "themes", label: "Themes" },
  { id: "risks", label: "Risks" },
  { id: "recommendations", label: "Recommendations" },
  { id: "roster", label: "Roster" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accentColor,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-xl border p-5 flex flex-col gap-2"
      style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
    >
      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color: accentColor }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs" style={{ color: "#64748b" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────

function MiniProgress({
  value,
  color,
  label,
  count,
  total,
}: {
  value: number;
  color: string;
  label: string;
  count: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium truncate" style={{ color: "#94a3b8" }}>
            {label}
          </span>
          <span className="text-xs ml-2 shrink-0" style={{ color: "#64748b" }}>
            {count}/{total}
          </span>
        </div>
        <div
          className="h-1.5 rounded-full w-full overflow-hidden"
          style={{ backgroundColor: "rgba(46,50,80,0.8)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  stats,
  orgBreakdown,
  maturityDistribution,
}: {
  stats: Props["stats"];
  orgBreakdown: Props["orgBreakdown"];
  maturityDistribution: Props["maturityDistribution"];
}) {
  const completedPct = Math.round((stats.completed / stats.total) * 100);
  const inProgressPct = Math.round((stats.inProgress / stats.total) * 100);
  const scheduledPct = Math.round((stats.scheduled / stats.total) * 100);

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Interviews"
          value={stats.total}
          sub="Planned for this initiative"
          accentColor="#6c63ff"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          sub={`${completedPct}% of total`}
          accentColor="#00d4aa"
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          sub="Active sessions"
          accentColor="#ffd166"
        />
        <StatCard
          label="Avg Maturity Score"
          value={stats.avgMaturity}
          sub="Out of 5.0"
          accentColor="#a78bfa"
        />
      </div>

      {/* Interview progress */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#94a3b8" }}>
          Interview Progress
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
            Overall Completion
          </span>
          <span className="text-sm font-bold" style={{ color: "#6c63ff" }}>
            {completedPct}%
          </span>
        </div>
        <div
          className="h-3 rounded-full w-full overflow-hidden mb-6"
          style={{ backgroundColor: "rgba(46,50,80,0.8)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${completedPct}%`, backgroundColor: "#6c63ff" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(orgBreakdown)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([dept, { total, completed }]) => (
              <MiniProgress
                key={dept}
                label={dept}
                count={completed}
                total={total}
                value={(completed / total) * 100}
                color={DEPT_COLORS[dept] ?? "#6c63ff"}
              />
            ))}
        </div>
      </div>

      {/* Status breakdown + Maturity distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status breakdown */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#94a3b8" }}>
            Interview Status
          </h2>
          <div className="space-y-3">
            {[
              { label: "Completed", count: stats.completed, pct: completedPct, color: "#00d4aa", bg: "rgba(0,212,170,0.1)" },
              { label: "In Progress", count: stats.inProgress, pct: inProgressPct, color: "#ffd166", bg: "rgba(255,209,102,0.1)" },
              { label: "Scheduled", count: stats.scheduled, pct: scheduledPct, color: "#6c63ff", bg: "rgba(108,99,255,0.1)" },
            ].map(({ label, count, pct, color, bg }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg p-3"
                style={{ backgroundColor: bg }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium" style={{ color: "#e2e8f0" }}>{label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold" style={{ color }}>{count}</span>
                  <span className="text-xs" style={{ color: "#64748b" }}>{pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maturity distribution */}
        <div
          className="rounded-xl border p-6"
          style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#94a3b8" }}>
            Maturity Distribution
          </h2>
          <div className="space-y-3">
            {(Object.keys(MATURITY_CONFIG) as Array<keyof typeof MATURITY_CONFIG>).map((level) => {
              const cfg = MATURITY_CONFIG[level];
              const count = maturityDistribution[level] ?? 0;
              const pct = Math.round((count / stats.total) * 100);
              return (
                <div key={level} className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold w-20 shrink-0"
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(46,50,80,0.8)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: "#64748b" }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Themes Tab ────────────────────────────────────────────────────────────────

function ThemesTab({ themes }: { themes: Theme[] }) {
  const barData = themes
    .sort((a, b) => b.interviewCount - a.interviewCount)
    .map((t) => ({ name: t.name, count: t.interviewCount, color: t.color }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
          Strategic Themes
        </h2>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Key themes identified across all discovery interviews, ranked by frequency of mention.
        </p>
      </div>

      {/* Theme cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes
          .sort((a, b) => b.interviewCount - a.interviewCount)
          .map((theme) => {
            const catColors: Record<string, string> = {
              risk: "#ff6b6b",
              opportunity: "#00d4aa",
              neutral: "#a78bfa",
            };
            const catBg: Record<string, string> = {
              risk: "rgba(255,107,107,0.12)",
              opportunity: "rgba(0,212,170,0.12)",
              neutral: "rgba(167,139,250,0.12)",
            };
            return (
              <div
                key={theme.id}
                className="rounded-xl border p-5 flex flex-col gap-3"
                style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>
                      {theme.name}
                    </span>
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0 capitalize"
                    style={{
                      color: catColors[theme.category] ?? "#a78bfa",
                      backgroundColor: catBg[theme.category] ?? "rgba(167,139,250,0.12)",
                    }}
                  >
                    {theme.category}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                  {theme.description}
                </p>
                <p className="text-xs font-medium mt-auto" style={{ color: theme.color }}>
                  {theme.interviewCount} of 53 interviews
                </p>
              </div>
            );
          })}
      </div>

      {/* Bar chart */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: "#94a3b8" }}>
          Theme Frequency
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 4, right: 16, left: -16, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e3250" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 11 }}
                angle={-35}
                textAnchor="end"
                interval={0}
                tickLine={false}
                axisLine={{ stroke: "#2e3250" }}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 53]}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#6c63ff">
                {barData.map((entry, index) => (
                  <rect key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar chart */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>
          Theme Scores by Department
        </h3>
        <p className="text-xs mb-6" style={{ color: "#64748b" }}>
          Relative AI maturity across six strategic dimensions (1–5 scale)
        </p>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.entries(RADAR_DEPT_COLORS).map(([dept, color]) => (
            <div key={dept} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs" style={{ color: "#94a3b8" }}>{dept}</span>
            </div>
          ))}
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#2e3250" />
              <PolarAngleAxis dataKey="axis" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 5]}
                tick={{ fill: "#64748b", fontSize: 10 }}
                tickCount={4}
              />
              {Object.entries(RADAR_DEPT_COLORS).map(([dept, color]) => (
                <Radar
                  key={dept}
                  name={dept}
                  dataKey={dept}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ))}
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── Risks Tab ─────────────────────────────────────────────────────────────────

const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function RisksTab({ risks }: { risks: Risk[] }) {
  const sorted = [...risks].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
          Risk Register
        </h2>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Strategic risks identified through the discovery process, ranked by severity.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((risk) => {
          const cfg = SEVERITY_CONFIG[risk.severity];
          return (
            <div
              key={risk.id}
              className="rounded-xl border p-6"
              style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                  {risk.title}
                </h3>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 capitalize"
                  style={{ color: cfg.color, backgroundColor: cfg.bg }}
                >
                  {cfg.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                {risk.description}
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                <div>
                  <span style={{ color: "#64748b" }}>Affected: </span>
                  <span style={{ color: "#e2e8f0" }}>{risk.affectedDepartments}</span>
                </div>
              </div>
              {risk.mitigation && (
                <div
                  className="mt-4 rounded-lg p-3 border-l-2"
                  style={{
                    backgroundColor: "rgba(108,99,255,0.07)",
                    borderLeftColor: "#6c63ff",
                  }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: "#6c63ff" }}>
                    Recommended Mitigation
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                    {risk.mitigation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Recommendations Tab ───────────────────────────────────────────────────────

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

function RecommendationsTab({ recommendations }: { recommendations: Recommendation[] }) {
  const sorted = [...recommendations].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9)
  );

  const impactColors: Record<string, string> = {
    high: "#00d4aa",
    medium: "#ffd166",
    low: "#64748b",
  };
  const effortColors: Record<string, string> = {
    high: "#ff6b6b",
    medium: "#ffd166",
    low: "#00d4aa",
  };
  const statusColors: Record<string, { color: string; bg: string }> = {
    proposed: { color: "#6c63ff", bg: "rgba(108,99,255,0.12)" },
    in_review: { color: "#ffd166", bg: "rgba(255,209,102,0.12)" },
    approved: { color: "#00d4aa", bg: "rgba(0,212,170,0.12)" },
    in_progress: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
    completed: { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
          Strategic Recommendations
        </h2>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Prioritized action items derived from the discovery interviews.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((rec) => {
          const priCfg = PRIORITY_CONFIG[rec.priority];
          const statCfg = statusColors[rec.status] ?? { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" };
          return (
            <div
              key={rec.id}
              className="rounded-xl border p-6"
              style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>
                  {rec.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                    style={{ color: priCfg.color, backgroundColor: priCfg.bg }}
                  >
                    {priCfg.label}
                  </span>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full capitalize"
                    style={{ color: statCfg.color, backgroundColor: statCfg.bg }}
                  >
                    {rec.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ color: "#a78bfa", borderColor: "rgba(167,139,250,0.3)", backgroundColor: "rgba(167,139,250,0.08)" }}
                >
                  {rec.themeArea}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ color: impactColors[rec.impact] ?? "#94a3b8", backgroundColor: `${impactColors[rec.impact] ?? "#94a3b8"}18` }}
                >
                  Impact: {rec.impact}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ color: effortColors[rec.effort] ?? "#94a3b8", backgroundColor: `${effortColors[rec.effort] ?? "#94a3b8"}18` }}
                >
                  Effort: {rec.effort}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
                {rec.description}
              </p>

              {rec.owner && (
                <p className="text-xs" style={{ color: "#64748b" }}>
                  <span style={{ color: "#94a3b8" }}>Owner: </span>
                  {rec.owner}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Roster Tab ────────────────────────────────────────────────────────────────

const STATUS_SORT: Record<string, number> = { completed: 0, in_progress: 1, scheduled: 2 };

function RosterTab({ interviewees }: { interviewees: Interviewee[] }) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [maturityFilter, setMaturityFilter] = useState("all");

  const departments = useMemo(() => {
    const depts = Array.from(new Set(interviewees.map((i) => i.department))).sort();
    return depts;
  }, [interviewees]);

  const filtered = useMemo(() => {
    return interviewees
      .filter((person) => {
        const matchSearch =
          !search || person.name.toLowerCase().includes(search.toLowerCase());
        const matchDept = deptFilter === "all" || person.department === deptFilter;
        const matchStatus = statusFilter === "all" || person.status === statusFilter;
        const matchMaturity =
          maturityFilter === "all" || person.maturityLevel === maturityFilter;
        return matchSearch && matchDept && matchStatus && matchMaturity;
      })
      .sort((a, b) => {
        const statusDiff =
          (STATUS_SORT[a.status] ?? 9) - (STATUS_SORT[b.status] ?? 9);
        if (statusDiff !== 0) return statusDiff;
        return a.name.localeCompare(b.name);
      });
  }, [interviewees, search, deptFilter, statusFilter, maturityFilter]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0" }}>
          Interview Roster
        </h2>
        <p className="text-sm" style={{ color: "#64748b" }}>
          All 53 interviewees across the AI Strategy Discovery Initiative.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#6c63ff] transition-all"
          style={{
            backgroundColor: "#1a1d2e",
            borderColor: "#2e3250",
            color: "#e2e8f0",
            minWidth: "200px",
          }}
        />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#6c63ff]"
          style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250", color: "#e2e8f0" }}
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#6c63ff]"
          style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250", color: "#e2e8f0" }}
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <select
          value={maturityFilter}
          onChange={(e) => setMaturityFilter(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#6c63ff]"
          style={{ backgroundColor: "#1a1d2e", borderColor: "#2e3250", color: "#e2e8f0" }}
        >
          <option value="all">All Maturity Levels</option>
          {(Object.keys(MATURITY_CONFIG) as Array<keyof typeof MATURITY_CONFIG>).map((key) => (
            <option key={key} value={key}>
              {MATURITY_CONFIG[key].label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "#2e3250" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "rgba(46,50,80,0.5)" }}>
                {["Name", "Title", "Department", "Maturity", "Status", "Date", "Quote"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#64748b", borderBottom: "1px solid #2e3250" }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((person, idx) => {
                const matCfg = MATURITY_CONFIG[person.maturityLevel];
                const statCfg = STATUS_CONFIG[person.status];
                const deptColor = DEPT_COLORS[person.department] ?? "#6c63ff";
                const truncatedQuote = person.standoutQuote
                  ? person.standoutQuote.slice(0, 60) +
                    (person.standoutQuote.length > 60 ? "…" : "")
                  : "—";

                return (
                  <tr
                    key={person.id}
                    className="transition-colors"
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#1a1d2e" : "rgba(26,29,46,0.6)",
                      borderBottom: "1px solid rgba(46,50,80,0.4)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(108,99,255,0.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#1a1d2e" : "rgba(26,29,46,0.6)")
                    }
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: "#e2e8f0", whiteSpace: "nowrap" }}>
                      {person.name}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#94a3b8", maxWidth: "180px" }}>
                      {person.title}
                    </td>
                    <td className="px-4 py-3" style={{ whiteSpace: "nowrap" }}>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: deptColor }}
                        />
                        <span className="text-xs" style={{ color: "#94a3b8" }}>
                          {person.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: matCfg.color, backgroundColor: matCfg.bg }}
                      >
                        {matCfg.short}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statCfg.dot}`}
                        />
                        <span className={`text-xs font-medium ${statCfg.color}`}>
                          {statCfg.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#64748b", whiteSpace: "nowrap" }}>
                      {formatDate(person.interviewDate)}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-xs" style={{ color: "#64748b" }}>
                      {person.standoutQuote ? (
                        <span title={person.standoutQuote} className="cursor-help">
                          {truncatedQuote}
                        </span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center" style={{ color: "#64748b" }}>
              No interviewees match the current filters.
            </div>
          )}
        </div>
      </div>
      <p className="text-xs" style={{ color: "#64748b" }}>
        Showing {filtered.length} of {interviewees.length} interviewees
      </p>
    </div>
  );
}

// ── Main DashboardClient ──────────────────────────────────────────────────────

export default function DashboardClient({
  interviewees,
  themes,
  risks,
  recommendations,
  stats,
  orgBreakdown,
  maturityDistribution,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 mb-8 border-b"
        style={{ borderColor: "#2e3250" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-3 text-sm font-medium transition-all rounded-t-lg relative -mb-px"
              style={{
                color: isActive ? "#6c63ff" : "#64748b",
                backgroundColor: isActive ? "rgba(108,99,255,0.1)" : "transparent",
                borderBottom: isActive ? "2px solid #6c63ff" : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <OverviewTab
          stats={stats}
          orgBreakdown={orgBreakdown}
          maturityDistribution={maturityDistribution}
        />
      )}
      {activeTab === "themes" && <ThemesTab themes={themes} />}
      {activeTab === "risks" && <RisksTab risks={risks} />}
      {activeTab === "recommendations" && (
        <RecommendationsTab recommendations={recommendations} />
      )}
      {activeTab === "roster" && <RosterTab interviewees={interviewees} />}
    </div>
  );
}
