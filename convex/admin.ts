import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

// Authorization lives beside the database functions, never in the React UI.
async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Staff authentication is required.");

  const admin = await ctx.db
    .query("admins")
    .withIndex("by_subject", (q) => q.eq("subject", identity.subject))
    .unique();

  if (!admin?.isActive) throw new Error("This staff account is not authorized.");
  return { identity, admin };
}

async function requireEditor(ctx: MutationCtx) {
  const staff = await requireAdmin(ctx);
  if (staff.admin.role === "reviewer") throw new Error("An owner or editor role is required for content changes.");
  return staff;
}

export const overview = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const [contacts, subscribers, rsvps, projectSubmissions, applications, events, projects, posts] = await Promise.all([
      ctx.db.query("contacts").collect(), ctx.db.query("subscribers").collect(), ctx.db.query("rsvps").collect(),
      ctx.db.query("projectSubmissions").collect(), ctx.db.query("applications").collect(), ctx.db.query("events").collect(),
      ctx.db.query("projects").collect(), ctx.db.query("blogPosts").collect(),
    ]);
    const pending = (item: { status: string }) => item.status === "new" || item.status === "in_review";
    return {
      newContacts: contacts.filter(pending).length,
      activeSubscribers: subscribers.filter((item) => item.status === "active").length,
      pendingRsvps: rsvps.filter(pending).length,
      pendingSubmissions: projectSubmissions.filter(pending).length + applications.filter(pending).length,
      publishedContent: events.filter((item) => item.status === "published").length + projects.filter((item) => item.status === "published").length + posts.filter((item) => item.status === "published").length,
    };
  },
});

export const submissionQueue = query({
  args: { type: v.union(v.literal("contacts"), v.literal("rsvps"), v.literal("projects"), v.literal("applications")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.type === "contacts") return await ctx.db.query("contacts").order("desc").take(100);
    if (args.type === "rsvps") return await ctx.db.query("rsvps").order("desc").take(100);
    if (args.type === "projects") return await ctx.db.query("projectSubmissions").order("desc").take(100);
    return await ctx.db.query("applications").order("desc").take(100);
  },
});

const status = v.union(v.literal("new"), v.literal("in_review"), v.literal("approved"), v.literal("declined"), v.literal("closed"));

async function recordStatusChange(ctx: MutationCtx, subject: string, entityType: string, entityId: string, nextStatus: "new" | "in_review" | "approved" | "declined" | "closed") {
  await ctx.db.insert("adminActivity", {
    actorSubject: subject, action: "status_updated", entityType, entityId, detail: nextStatus, createdAt: Date.now(),
  });
}

export const updateContactStatus = mutation({
  args: {
    id: v.id("contacts"), status,
  },
  handler: async (ctx, args) => {
    const { identity } = await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
    await recordStatusChange(ctx, identity.subject, "contacts", args.id, args.status);
  },
});

export const updateRsvpStatus = mutation({
  args: { id: v.id("rsvps"), status },
  handler: async (ctx, args) => {
    const { identity } = await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
    await recordStatusChange(ctx, identity.subject, "rsvps", args.id, args.status);
  },
});

export const updateProjectSubmissionStatus = mutation({
  args: { id: v.id("projectSubmissions"), status },
  handler: async (ctx, args) => {
    const { identity } = await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
    await recordStatusChange(ctx, identity.subject, "projectSubmissions", args.id, args.status);
  },
});

export const updateApplicationStatus = mutation({
  args: { id: v.id("applications"), status },
  handler: async (ctx, args) => {
    const { identity } = await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
    await recordStatusChange(ctx, identity.subject, "applications", args.id, args.status);
  },
});

export const saveEvent = mutation({
  args: {
    id: v.optional(v.id("events")), title: v.string(), slug: v.string(), description: v.string(), longDescription: v.optional(v.string()),
    type: v.string(), tags: v.array(v.string()), startAt: v.number(), endAt: v.optional(v.number()), location: v.optional(v.string()),
    registrationUrl: v.optional(v.string()), capacity: v.optional(v.number()), coverImage: v.optional(v.string()), isFeatured: v.boolean(),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, { id, ...event }) => {
    const { identity } = await requireEditor(ctx);
    const sameSlug = await ctx.db.query("events").withIndex("by_slug", (q) => q.eq("slug", event.slug)).unique();
    if (sameSlug && sameSlug._id !== id) throw new Error("Another event already uses this slug.");
    const now = Date.now();
    const recordId = id ?? await ctx.db.insert("events", { ...event, createdAt: now, updatedAt: now });
    if (id) await ctx.db.patch(id, { ...event, updatedAt: now });
    await ctx.db.insert("adminActivity", { actorSubject: identity.subject, action: id ? "event_updated" : "event_created", entityType: "events", entityId: recordId, createdAt: now });
    return recordId;
  },
});

export const saveProject = mutation({
  args: {
    id: v.optional(v.id("projects")), title: v.string(), slug: v.string(), category: v.string(), description: v.string(), longDescription: v.optional(v.string()),
    tech: v.array(v.string()), repositoryUrl: v.optional(v.string()), liveUrl: v.optional(v.string()), coverImage: v.optional(v.string()), isFeatured: v.boolean(),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, { id, ...project }) => {
    const { identity } = await requireEditor(ctx);
    const sameSlug = await ctx.db.query("projects").withIndex("by_slug", (q) => q.eq("slug", project.slug)).unique();
    if (sameSlug && sameSlug._id !== id) throw new Error("Another project already uses this slug.");
    const now = Date.now();
    const recordId = id ?? await ctx.db.insert("projects", { ...project, createdAt: now, updatedAt: now });
    if (id) await ctx.db.patch(id, { ...project, updatedAt: now });
    await ctx.db.insert("adminActivity", { actorSubject: identity.subject, action: id ? "project_updated" : "project_created", entityType: "projects", entityId: recordId, createdAt: now });
    return recordId;
  },
});

export const saveBlogPost = mutation({
  args: {
    id: v.optional(v.id("blogPosts")), title: v.string(), slug: v.string(), summary: v.string(), body: v.string(), category: v.string(), tags: v.array(v.string()),
    coverImage: v.optional(v.string()), authorName: v.string(), readingMinutes: v.optional(v.number()), publishedAt: v.optional(v.number()),
    status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, { id, ...post }) => {
    const { identity } = await requireEditor(ctx);
    const sameSlug = await ctx.db.query("blogPosts").withIndex("by_slug", (q) => q.eq("slug", post.slug)).unique();
    if (sameSlug && sameSlug._id !== id) throw new Error("Another post already uses this slug.");
    const now = Date.now();
    const recordId = id ?? await ctx.db.insert("blogPosts", { ...post, createdAt: now, updatedAt: now });
    if (id) await ctx.db.patch(id, { ...post, updatedAt: now });
    await ctx.db.insert("adminActivity", { actorSubject: identity.subject, action: id ? "post_updated" : "post_created", entityType: "blogPosts", entityId: recordId, createdAt: now });
    return recordId;
  },
});

export const saveResource = mutation({
  args: {
    id: v.optional(v.id("resources")), title: v.string(), slug: v.string(), category: v.string(), type: v.string(), description: v.string(), url: v.string(),
    tags: v.array(v.string()), difficulty: v.optional(v.string()), status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, { id, ...resource }) => {
    const { identity } = await requireEditor(ctx);
    const sameSlug = await ctx.db.query("resources").withIndex("by_slug", (q) => q.eq("slug", resource.slug)).unique();
    if (sameSlug && sameSlug._id !== id) throw new Error("Another resource already uses this slug.");
    const now = Date.now();
    const recordId = id ?? await ctx.db.insert("resources", { ...resource, createdAt: now, updatedAt: now });
    if (id) await ctx.db.patch(id, { ...resource, updatedAt: now });
    await ctx.db.insert("adminActivity", { actorSubject: identity.subject, action: id ? "resource_updated" : "resource_created", entityType: "resources", entityId: recordId, createdAt: now });
    return recordId;
  },
});

export const saveBootcamp = mutation({
  args: {
    id: v.optional(v.id("bootcamps")), title: v.string(), slug: v.string(), summary: v.string(), duration: v.string(), level: v.string(), capacity: v.optional(v.number()),
    applicationUrl: v.optional(v.string()), status: v.union(v.literal("draft"), v.literal("scheduled"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, { id, ...bootcamp }) => {
    const { identity } = await requireEditor(ctx);
    const sameSlug = await ctx.db.query("bootcamps").withIndex("by_slug", (q) => q.eq("slug", bootcamp.slug)).unique();
    if (sameSlug && sameSlug._id !== id) throw new Error("Another bootcamp already uses this slug.");
    const now = Date.now();
    const recordId = id ?? await ctx.db.insert("bootcamps", { ...bootcamp, createdAt: now, updatedAt: now });
    if (id) await ctx.db.patch(id, { ...bootcamp, updatedAt: now });
    await ctx.db.insert("adminActivity", { actorSubject: identity.subject, action: id ? "bootcamp_updated" : "bootcamp_created", entityType: "bootcamps", entityId: recordId, createdAt: now });
    return recordId;
  },
});
