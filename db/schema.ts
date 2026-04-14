import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const interviewStatusEnum = pgEnum("interview_status", [
  "scheduled",
  "in_progress",
  "completed",
]);

export const maturityLevelEnum = pgEnum("maturity_level", [
  "l1_unaware",
  "l2_experimenting",
  "l3_adopting",
  "l4_scaling",
  "l5_transforming",
]);

export const severityEnum = pgEnum("severity", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const interviewees = pgTable("interviewees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  maturityScore: integer("maturity_score").notNull().default(1),
  maturityLevel: maturityLevelEnum("maturity_level")
    .notNull()
    .default("l1_unaware"),
  status: interviewStatusEnum("status").notNull().default("scheduled"),
  standoutQuote: text("standout_quote"),
  interviewDate: timestamp("interview_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  interviewCount: integer("interview_count").notNull().default(0),
  category: text("category").notNull(), // "risk" | "opportunity" | "neutral"
  color: text("color").notNull().default("#6366f1"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const risks = pgTable("risks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: severityEnum("severity").notNull().default("medium"),
  affectedDepartments: text("affected_departments").notNull(),
  mitigation: text("mitigation"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  themeArea: text("theme_area").notNull(),
  status: text("status").notNull().default("proposed"),
  impact: text("impact").notNull().default("medium"),
  effort: text("effort").notNull().default("medium"),
  owner: text("owner"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Interviewee = typeof interviewees.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type Risk = typeof risks.$inferSelect;
export type Recommendation = typeof recommendations.$inferSelect;
