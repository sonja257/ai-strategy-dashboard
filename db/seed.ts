import { db } from "./index";
import { interviewees, themes, risks, recommendations } from "./schema";

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(recommendations);
  await db.delete(risks);
  await db.delete(themes);
  await db.delete(interviewees);

  // ─── INTERVIEWEES ────────────────────────────────────────────────────────────
  await db.insert(interviewees).values([
    // Engineering (8)
    {
      name: "Jimmy Park",
      title: "VP Engineering",
      department: "Engineering",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "completed",
      standoutQuote:
        "We've reduced deployment cycle time by 60% using AI-assisted code review. But we have no governance framework for AI-generated code in production — that's a real risk.",
      interviewDate: new Date("2026-04-02"),
    },
    {
      name: "Sarah Chen",
      title: "Director of Platform Engineering",
      department: "Engineering",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "completed",
      standoutQuote:
        "The infrastructure required to support AI workloads is significant. We're looking at a 3x increase in compute requirements over the next 18 months.",
      interviewDate: new Date("2026-04-04"),
    },
    {
      name: "Marcus Webb",
      title: "Director of Data Engineering",
      department: "Engineering",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "completed",
      standoutQuote:
        "Our data pipelines are the foundation everything else depends on. Without clean, accessible data, every AI initiative will fail. We're not there yet.",
      interviewDate: new Date("2026-04-07"),
    },
    {
      name: "Priya Sharma",
      title: "Head of DevOps",
      department: "Engineering",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "in_progress",
      standoutQuote:
        "GitHub Copilot has been transformative for the team. But we need clear boundaries — what can AI touch in our codebase, and what's off limits?",
      interviewDate: new Date("2026-04-13"),
    },
    {
      name: "Tyler Brooks",
      title: "Senior Engineering Manager",
      department: "Engineering",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Elena Rodriguez",
      title: "Director of Security Engineering",
      department: "Engineering",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "David Kim",
      title: "Head of QA",
      department: "Engineering",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Rachel Torres",
      title: "Director of Mobile Engineering",
      department: "Engineering",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Product (6)
    {
      name: "Jennifer Liu",
      title: "Chief Product Officer",
      department: "Product",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "completed",
      standoutQuote:
        "Every roadmap item now gets an AI lens. If we can't articulate how AI improves the outcome, we deprioritize it.",
      interviewDate: new Date("2026-03-31"),
    },
    {
      name: "Alex Murphy",
      title: "VP Product",
      department: "Product",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "completed",
      standoutQuote:
        "We have the intent but not the infrastructure. AI features keep slipping because the data isn't ready.",
      interviewDate: new Date("2026-04-03"),
    },
    {
      name: "Samantha Grant",
      title: "Director of Product, Core",
      department: "Product",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Carlos Rivera",
      title: "Director of Product, AI/ML",
      department: "Product",
      maturityScore: 5,
      maturityLevel: "l5_transforming",
      status: "completed",
      standoutQuote:
        "We're designing AI-native experiences from day one. The rest of the product org is still catching up to what that actually means.",
      interviewDate: new Date("2026-04-08"),
    },
    {
      name: "Mia Johnson",
      title: "Head of Product Design",
      department: "Product",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Ryan Chen",
      title: "Director of Product Analytics",
      department: "Product",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Sales (7)
    {
      name: "Steve Davidson",
      title: "VP Sales",
      department: "Sales",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "completed",
      standoutQuote:
        "My reps are using AI for call prep and follow-ups. The outputs are good but we have zero policy on what's appropriate to share with customers.",
      interviewDate: new Date("2026-04-05"),
    },
    {
      name: "Maz Khalil",
      title: "Director of Solutions Engineering",
      department: "Sales",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "completed",
      standoutQuote:
        "We built a custom AI demo tool and it's already won us three major accounts. The ROI story is crystal clear in sales.",
      interviewDate: new Date("2026-04-09"),
    },
    {
      name: "Olivia Turner",
      title: "VP of Strategic Accounts",
      department: "Sales",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Nathan Ford",
      title: "Regional VP of Sales",
      department: "Sales",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Sophia Williams",
      title: "VP of Sales Development",
      department: "Sales",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Lucas Martin",
      title: "Director of Revenue Operations",
      department: "Sales",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Hannah Kim",
      title: "VP of Partnerships",
      department: "Sales",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Marketing (5)
    {
      name: "Daniel Ross",
      title: "VP Marketing",
      department: "Marketing",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "completed",
      standoutQuote:
        "We've cut content production time in half but quality is inconsistent. We need editorial standards for AI-assisted content before we scale this.",
      interviewDate: new Date("2026-04-06"),
    },
    {
      name: "Isabella Patel",
      title: "Director of Content",
      department: "Marketing",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Ethan Wallace",
      title: "VP of Demand Generation",
      department: "Marketing",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Grace Lee",
      title: "Director of Brand",
      department: "Marketing",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Aiden Thompson",
      title: "Head of Growth",
      department: "Marketing",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // HR (5)
    {
      name: "Weldon Harris",
      title: "Chief People Officer",
      department: "HR",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "completed",
      standoutQuote:
        "Our people are scared AI will take their jobs. We need a clear narrative — AI amplifies humans, it doesn't replace them. And we need it fast.",
      interviewDate: new Date("2026-04-10"),
    },
    {
      name: "Natalie Brown",
      title: "VP of Talent Acquisition",
      department: "HR",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Christopher Evans",
      title: "Director of HRBPs",
      department: "HR",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Lily Zhang",
      title: "Director of Learning & Development",
      department: "HR",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Brandon Scott",
      title: "VP of Comp & Benefits",
      department: "HR",
      maturityScore: 1,
      maturityLevel: "l1_unaware",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Legal (4)
    {
      name: "Victoria Hughes",
      title: "General Counsel",
      department: "Legal",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Patrick O'Brien",
      title: "VP of Legal Compliance",
      department: "Legal",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Rebecca Stone",
      title: "Director of Privacy & Data",
      department: "Legal",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Thomas Clark",
      title: "Director of IP & Contracts",
      department: "Legal",
      maturityScore: 1,
      maturityLevel: "l1_unaware",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Finance (4)
    {
      name: "Sandra Mitchell",
      title: "CFO",
      department: "Finance",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "James Carter",
      title: "VP of FP&A",
      department: "Finance",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Amanda Foster",
      title: "Director of Accounting",
      department: "Finance",
      maturityScore: 1,
      maturityLevel: "l1_unaware",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Michael Reed",
      title: "VP of Corporate Finance",
      department: "Finance",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Operations (6)
    {
      name: "Ashley Morgan",
      title: "VP Operations",
      department: "Operations",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "completed",
      standoutQuote:
        "We're running 200-plus manual processes that AI could automate tomorrow. We just don't know where to start, and there's no one to ask.",
      interviewDate: new Date("2026-04-11"),
    },
    {
      name: "Brian Nelson",
      title: "Director of Business Operations",
      department: "Operations",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Chelsea White",
      title: "VP of Customer Operations",
      department: "Operations",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Derek Johnson",
      title: "Director of IT Infrastructure",
      department: "Operations",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Emma Davis",
      title: "Head of Facilities",
      department: "Operations",
      maturityScore: 1,
      maturityLevel: "l1_unaware",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Frank Wilson",
      title: "Director of Procurement",
      department: "Operations",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Customer Success (5)
    {
      name: "Grace Hall",
      title: "VP of Customer Success",
      department: "Customer Success",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Henry Baker",
      title: "Director of Customer Onboarding",
      department: "Customer Success",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Irene Young",
      title: "Director of Customer Education",
      department: "Customer Success",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Jacob Adams",
      title: "VP of Professional Services",
      department: "Customer Success",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Katherine Green",
      title: "Director of Customer Support",
      department: "Customer Success",
      maturityScore: 2,
      maturityLevel: "l2_experimenting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },

    // Data & Analytics (3)
    {
      name: "Leo Martinez",
      title: "VP of Data Analytics",
      department: "Data & Analytics",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Michelle Lee",
      title: "Director of Business Intelligence",
      department: "Data & Analytics",
      maturityScore: 3,
      maturityLevel: "l3_adopting",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
    {
      name: "Noah Jackson",
      title: "Head of Data Science",
      department: "Data & Analytics",
      maturityScore: 4,
      maturityLevel: "l4_scaling",
      status: "scheduled",
      standoutQuote: null,
      interviewDate: null,
    },
  ]);

  // ─── THEMES ──────────────────────────────────────────────────────────────────
  await db.insert(themes).values([
    {
      name: "Governance & Risk",
      description:
        "No formal AI policy, ownership, or governance body exists. Shadow AI usage is growing unchecked across functions.",
      interviewCount: 47,
      category: "risk",
      color: "#ff6b6b",
    },
    {
      name: "Skills & Change Management",
      description:
        "The pace of AI advancement is outstripping internal upskilling capacity. Anxiety is high, especially in non-technical functions.",
      interviewCount: 44,
      category: "risk",
      color: "#ff9966",
    },
    {
      name: "Infrastructure Gap",
      description:
        "Fragmented data architecture and legacy systems are the primary bottleneck to AI adoption at scale.",
      interviewCount: 38,
      category: "risk",
      color: "#ffd166",
    },
    {
      name: "Process Automation",
      description:
        "High-volume, repetitive workflows across Ops, Finance, and CS represent immediate automation opportunities with strong ROI.",
      interviewCount: 35,
      category: "opportunity",
      color: "#00d4aa",
    },
    {
      name: "Product Development / API-first",
      description:
        "Engineering and Product are aligned on building AI-native features, but speed is constrained by data access and governance.",
      interviewCount: 31,
      category: "opportunity",
      color: "#6c63ff",
    },
    {
      name: "Knowledge Management",
      description:
        "Institutional knowledge is siloed and undocumented. AI-powered knowledge bases represent a high-value, low-disruption win.",
      interviewCount: 28,
      category: "opportunity",
      color: "#a78bfa",
    },
    {
      name: "Customer Experience",
      description:
        "AI-driven personalization and support automation are seen as competitive differentiators, but customer data governance is a blocker.",
      interviewCount: 22,
      category: "opportunity",
      color: "#22d3ee",
    },
    {
      name: "Data & Analytics",
      description:
        "Leaders want better business intelligence but lack clean data pipelines and self-serve analytics capabilities.",
      interviewCount: 19,
      category: "neutral",
      color: "#34d399",
    },
  ]);

  // ─── RISKS ───────────────────────────────────────────────────────────────────
  await db.insert(risks).values([
    {
      title: "AI Governance Void",
      severity: "critical",
      description:
        "No formal AI policy, ethics framework, or governance body exists. Employees are making independent decisions about AI tool adoption, data sharing, and output usage with no organizational guardrails.",
      affectedDepartments: "All Departments",
      mitigation:
        "Establish a cross-functional AI Governance Council within 30 days. Draft and ratify an AI Acceptable Use Policy covering data handling, output review, and vendor approval.",
    },
    {
      title: "Skills Gap Acceleration",
      severity: "high",
      description:
        "The pace of AI capability development is far outstripping internal upskilling. Non-technical functions report feeling left behind, creating adoption resistance and a two-tier workforce dynamic.",
      affectedDepartments: "HR, Operations, Finance, Legal",
      mitigation:
        "Launch a tiered AI Fluency Program: executive orientation, manager enablement, and IC-level tool training. Partner with L&D to embed AI literacy into onboarding.",
    },
    {
      title: "Data Fragmentation",
      severity: "high",
      description:
        "Siloed data architecture across business units severely limits the quality and reach of AI outputs. Multiple leaders cited data access as their #1 blocker.",
      affectedDepartments: "Engineering, Product, Data & Analytics",
      mitigation:
        "Fund a data infrastructure modernization initiative. Prioritize a unified data layer and internal API standards that AI systems can reliably consume.",
    },
    {
      title: "Legal & Compliance Exposure",
      severity: "high",
      description:
        "AI-generated customer-facing content, contract language, and data processing activities are creating unreviewed legal liability. Legal has not been included in AI rollout decisions.",
      affectedDepartments: "Legal, Marketing, Sales",
      mitigation:
        "Require Legal review for all customer-facing AI outputs. Conduct an immediate audit of current AI tool usage for GDPR, CCPA, and IP compliance exposure.",
    },
    {
      title: "Vendor Concentration Risk",
      severity: "medium",
      description:
        "Over-reliance on a single AI provider creates strategic and operational risk. A provider outage, pricing change, or capability gap could halt multiple initiatives simultaneously.",
      affectedDepartments: "Engineering, Product",
      mitigation:
        "Develop a multi-vendor AI strategy. Evaluate at least two providers per use case category. Build abstraction layers to enable provider switching.",
    },
    {
      title: "Change Management Deficit",
      severity: "medium",
      description:
        "Employee anxiety about job displacement is widespread and largely unaddressed. Without proactive communication and reskilling investment, resistance will slow adoption and increase attrition risk.",
      affectedDepartments: "HR, All Departments",
      mitigation:
        "Launch a transparent AI communications program. Define human-AI collaboration principles. Tie AI adoption to performance enablement, not headcount reduction.",
    },
    {
      title: "ROI Measurement Gap",
      severity: "low",
      description:
        "No consistent framework exists for measuring the return on AI investments. This makes prioritization arbitrary and undermines the business case for continued investment.",
      affectedDepartments: "Finance, Leadership",
      mitigation:
        "Define a standard AI ROI framework covering productivity gains, cost avoidance, and revenue impact. Require all AI pilots to include measurable success criteria before funding.",
    },
  ]);

  // ─── RECOMMENDATIONS ─────────────────────────────────────────────────────────
  await db.insert(recommendations).values([
    {
      title: "Establish AI Governance Council",
      priority: "high",
      themeArea: "Governance & Risk",
      status: "proposed",
      impact: "high",
      effort: "medium",
      owner: "CEO + General Counsel",
      description:
        "Form a cross-functional AI Governance Council with representation from Legal, Engineering, HR, Product, and Finance. Charter it to own AI policy, vendor approval, and ethics review. Meet bi-weekly.",
    },
    {
      title: "Launch Company-Wide AI Fluency Program",
      priority: "high",
      themeArea: "Skills & Change Management",
      status: "proposed",
      impact: "high",
      effort: "high",
      owner: "Chief People Officer",
      description:
        "Design and deploy a three-tier AI literacy curriculum: executive orientation (2hrs), manager enablement (8hrs), and role-based IC training (4-16hrs). Integrate into onboarding within 90 days.",
    },
    {
      title: "Modernize Data Infrastructure",
      priority: "high",
      themeArea: "Infrastructure Gap",
      status: "in_review",
      impact: "high",
      effort: "high",
      owner: "VP Engineering + VP Data",
      description:
        "Fund a focused data infrastructure modernization initiative. Prioritize a unified data layer, internal API standards, and self-serve analytics capabilities. This is the prerequisite for 80% of AI use cases.",
    },
    {
      title: "Identify & Fund 5 Quick-Win Automations",
      priority: "high",
      themeArea: "Process Automation",
      status: "proposed",
      impact: "high",
      effort: "low",
      owner: "VP Operations",
      description:
        "Map and prioritize the top 5 high-volume, low-complexity workflows for immediate automation. Target: 3 from Operations, 1 from Finance, 1 from Customer Success. Deliver ROI within 60 days.",
    },
    {
      title: "Draft AI Acceptable Use Policy",
      priority: "high",
      themeArea: "Governance & Risk",
      status: "in_review",
      impact: "high",
      effort: "low",
      owner: "General Counsel",
      description:
        "Publish a clear AI Acceptable Use Policy covering: approved tools, data handling rules, customer-facing output review requirements, and IP ownership guidelines. Required reading for all employees.",
    },
    {
      title: "Create Internal AI Center of Excellence",
      priority: "medium",
      themeArea: "Product Development / API-first",
      status: "proposed",
      impact: "high",
      effort: "medium",
      owner: "CPO + VP Engineering",
      description:
        "Stand up an internal AI CoE to centralize prompt engineering expertise, maintain a library of approved use cases, and accelerate cross-functional adoption. Seed with 3-5 full-time practitioners.",
    },
    {
      title: "Implement AI Communications Program",
      priority: "medium",
      themeArea: "Skills & Change Management",
      status: "proposed",
      impact: "medium",
      effort: "low",
      owner: "Chief People Officer",
      description:
        "Launch a proactive, transparent communications program that defines the company's human-AI collaboration principles, addresses job displacement fears directly, and celebrates AI productivity wins.",
    },
    {
      title: "Define AI ROI Measurement Framework",
      priority: "medium",
      themeArea: "Governance & Risk",
      status: "proposed",
      impact: "medium",
      effort: "low",
      owner: "CFO + VP FP&A",
      description:
        "Define a standard framework for measuring AI investment returns across three dimensions: productivity gains (hours saved), cost avoidance (manual process elimination), and revenue impact (pipeline influenced). Apply retroactively to current pilots.",
    },
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
