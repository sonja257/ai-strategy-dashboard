import { db } from "@/db";
import { interviewees, themes, risks, recommendations } from "@/db/schema";
import { MATURITY_CONFIG } from "@/lib/utils";
import DashboardClient from "@/components/dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [allInterviewees, allThemes, allRisks, allRecommendations] =
    await Promise.all([
      db.select().from(interviewees),
      db.select().from(themes),
      db.select().from(risks),
      db.select().from(recommendations),
    ]);

  // ── Compute stats ────────────────────────────────────────────────────────────
  const total = allInterviewees.length;
  const completed = allInterviewees.filter((i) => i.status === "completed").length;
  const inProgress = allInterviewees.filter((i) => i.status === "in_progress").length;
  const scheduled = allInterviewees.filter((i) => i.status === "scheduled").length;

  // Average maturity score
  const avgMaturity =
    allInterviewees.reduce((sum, i) => sum + i.maturityScore, 0) / total;

  // Department breakdown: { dept: { total, completed } }
  const orgBreakdown: Record<string, { total: number; completed: number }> = {};
  for (const person of allInterviewees) {
    if (!orgBreakdown[person.department]) {
      orgBreakdown[person.department] = { total: 0, completed: 0 };
    }
    orgBreakdown[person.department].total++;
    if (person.status === "completed") {
      orgBreakdown[person.department].completed++;
    }
  }

  // Maturity distribution: { level: count }
  const maturityDistribution: Record<string, number> = {
    l1_unaware: 0,
    l2_experimenting: 0,
    l3_adopting: 0,
    l4_scaling: 0,
    l5_transforming: 0,
  };
  for (const person of allInterviewees) {
    maturityDistribution[person.maturityLevel]++;
  }

  return (
    <DashboardClient
      interviewees={allInterviewees}
      themes={allThemes}
      risks={allRisks}
      recommendations={allRecommendations}
      stats={{
        total,
        completed,
        inProgress,
        scheduled,
        avgMaturity: Math.round(avgMaturity * 10) / 10,
      }}
      orgBreakdown={orgBreakdown}
      maturityDistribution={maturityDistribution}
    />
  );
}
