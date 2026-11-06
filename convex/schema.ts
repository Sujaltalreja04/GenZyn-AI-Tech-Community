import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const contentStatus = v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived"));
const reviewStatus = v.union(v.literal("new"), v.literal("in_review"), v.literal("approved"), v.literal("declined"), v.literal("closed"));

export default defineSchema({
  // Only staff identities listed here can use admin functions. Never expose this table publicly.
  admins: defineTable({
    subject: v.string(), email: v.string(), name: v.optional(v.string()),
    role: v.union(v.literal("owner"), v.literal("editor"), v.literal("reviewer")),
    isActive: v.boolean(), createdAt: v.number(), updatedAt: v.number(),
  }).index("by_subject", ["subject"]).index("by_email", ["email"]),

  events: defineTable({
    title: v.string(), slug: v.string(), description: v.string(), longDescription: v.optional(v.string()), type: v.string(), tags: v.array(v.string()),
    startAt: v.number(), endAt: v.optional(v.number()), location: v.optional(v.string()), registrationUrl: v.optional(v.string()), capacity: v.optional(v.number()),
    coverImage: v.optional(v.string()), isFeatured: v.boolean(), status: contentStatus, createdAt: v.number(), updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]).index("by_startAt", ["startAt"]),

  projects: defineTable({
    title: v.string(), slug: v.string(), category: v.string(), description: v.string(), longDescription: v.optional(v.string()), tech: v.array(v.string()),
    repositoryUrl: v.optional(v.string()), liveUrl: v.optional(v.string()), coverImage: v.optional(v.string()), isFeatured: v.boolean(), status: contentStatus,
    createdAt: v.number(), updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]).index("by_category", ["category"]),

  blogPosts: defineTable({
    title: v.string(), slug: v.string(), summary: v.string(), body: v.string(), category: v.string(), tags: v.array(v.string()), coverImage: v.optional(v.string()),
    authorName: v.string(), readingMinutes: v.optional(v.number()), publishedAt: v.optional(v.number()), status: contentStatus, createdAt: v.number(), updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]).index("by_publishedAt", ["publishedAt"]),

  resources: defineTable({
    title: v.string(), slug: v.string(), category: v.string(), type: v.string(), description: v.string(), url: v.string(), tags: v.array(v.string()),
    difficulty: v.optional(v.string()), status: contentStatus, createdAt: v.number(), updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]).index("by_category", ["category"]),

  bootcamps: defineTable({
    title: v.string(), slug: v.string(), summary: v.string(), duration: v.string(), level: v.string(), capacity: v.optional(v.number()),
    applicationUrl: v.optional(v.string()), status: contentStatus, createdAt: v.number(), updatedAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_status", ["status"]),

  siteSettings: defineTable({ key: v.string(), value: v.string(), updatedAt: v.number(), updatedBy: v.optional(v.string()) }).index("by_key", ["key"]),

  contacts: defineTable({
    name: v.string(), email: v.string(), subject: v.optional(v.string()), message: v.string(), consentToContact: v.boolean(),
    status: reviewStatus, submittedAt: v.number(), source: v.string(),
  }).index("by_status", ["status"]).index("by_email", ["email"]).index("by_submittedAt", ["submittedAt"]),

  subscribers: defineTable({
    email: v.string(), consentAt: v.number(), source: v.string(), status: v.union(v.literal("active"), v.literal("unsubscribed")), unsubscribedAt: v.optional(v.number()),
  }).index("by_email", ["email"]),

  rsvps: defineTable({
    eventId: v.id("events"), name: v.string(), email: v.string(), phone: v.optional(v.string()), status: reviewStatus, registeredAt: v.number(), source: v.string(),
  }).index("by_event", ["eventId"]).index("by_email", ["email"]).index("by_event_email", ["eventId", "email"]),

  projectSubmissions: defineTable({
    name: v.string(), email: v.string(), projectTitle: v.string(), description: v.string(), category: v.optional(v.string()), repositoryUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()), status: reviewStatus, submittedAt: v.number(),
  }).index("by_status", ["status"]).index("by_email", ["email"]),

  applications: defineTable({
    kind: v.union(v.literal("career"), v.literal("team"), v.literal("incubator")), name: v.string(), email: v.string(), phone: v.optional(v.string()),
    message: v.optional(v.string()), portfolioUrl: v.optional(v.string()), resumeUrl: v.optional(v.string()), details: v.optional(v.string()), status: reviewStatus, submittedAt: v.number(),
  }).index("by_kind_status", ["kind", "status"]).index("by_email", ["email"]),

  adminActivity: defineTable({
    actorSubject: v.string(), action: v.string(), entityType: v.string(), entityId: v.string(), detail: v.optional(v.string()), createdAt: v.number(),
  }).index("by_entity", ["entityType", "entityId"]).index("by_createdAt", ["createdAt"]),
});
