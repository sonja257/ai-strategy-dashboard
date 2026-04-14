import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export const MATURITY_CONFIG = {
  l1_unaware: {
    label: "L1 · Unaware",
    short: "L1",
    score: 1,
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.15)",
    border: "rgba(255,107,107,0.4)",
  },
  l2_experimenting: {
    label: "L2 · Experimenting",
    short: "L2",
    score: 2,
    color: "#ffd166",
    bg: "rgba(255,209,102,0.15)",
    border: "rgba(255,209,102,0.4)",
  },
  l3_adopting: {
    label: "L3 · Adopting",
    short: "L3",
    score: 3,
    color: "#6c63ff",
    bg: "rgba(108,99,255,0.15)",
    border: "rgba(108,99,255,0.4)",
  },
  l4_scaling: {
    label: "L4 · Scaling",
    short: "L4",
    score: 4,
    color: "#00d4aa",
    bg: "rgba(0,212,170,0.15)",
    border: "rgba(0,212,170,0.4)",
  },
  l5_transforming: {
    label: "L5 · Transforming",
    short: "L5",
    score: 5,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.4)",
  },
} as const;

export const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    color: "text-[#00d4aa]",
    bg: "bg-[rgba(0,212,170,0.12)]",
    dot: "bg-[#00d4aa]",
  },
  in_progress: {
    label: "In Progress",
    color: "text-[#ffd166]",
    bg: "bg-[rgba(255,209,102,0.12)]",
    dot: "bg-[#ffd166] animate-pulse",
  },
  scheduled: {
    label: "Scheduled",
    color: "text-muted-foreground",
    bg: "bg-muted/40",
    dot: "bg-muted-foreground",
  },
} as const;

export const SEVERITY_CONFIG = {
  critical: { label: "Critical", color: "#ff6b6b", bg: "rgba(255,107,107,0.15)" },
  high: { label: "High", color: "#ff9966", bg: "rgba(255,153,102,0.15)" },
  medium: { label: "Medium", color: "#ffd166", bg: "rgba(255,209,102,0.15)" },
  low: { label: "Low", color: "#00d4aa", bg: "rgba(0,212,170,0.15)" },
} as const;

export const PRIORITY_CONFIG = {
  high: { label: "High Priority", color: "#ff6b6b", bg: "rgba(255,107,107,0.12)" },
  medium: { label: "Medium Priority", color: "#ffd166", bg: "rgba(255,209,102,0.12)" },
  low: { label: "Low Priority", color: "#6c63ff", bg: "rgba(108,99,255,0.12)" },
} as const;

export const DEPT_COLORS: Record<string, string> = {
  Engineering: "#6c63ff",
  Product: "#a78bfa",
  Sales: "#00d4aa",
  Marketing: "#f472b6",
  HR: "#ffd166",
  Legal: "#ff6b6b",
  Finance: "#94a3b8",
  Operations: "#fb923c",
  "Customer Success": "#22d3ee",
  "Data & Analytics": "#34d399",
};
