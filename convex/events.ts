import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all events
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

// Seed an event (utility)
export const create = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    description: v.string(),
    type: v.string(),
    tags: v.array(v.string()),
    link: v.string(),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});
