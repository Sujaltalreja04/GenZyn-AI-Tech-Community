import { query } from "./_generated/server";
import { v } from "convex/values";

// Visitor queries are strictly read-only and return published records only.
export const publishedEvents = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("events").withIndex("by_status", (q) => q.eq("status", "published")).collect(),
});

export const publishedProjects = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("projects").withIndex("by_status", (q) => q.eq("status", "published")).collect(),
});

export const publishedPosts = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const posts = await ctx.db.query("blogPosts").withIndex("by_status", (q) => q.eq("status", "published")).collect();
    return args.category ? posts.filter((post) => post.category === args.category) : posts;
  },
});

export const publishedResources = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("resources").withIndex("by_status", (q) => q.eq("status", "published")).collect(),
});
