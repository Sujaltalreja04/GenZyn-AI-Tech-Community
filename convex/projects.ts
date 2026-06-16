import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all open-source projects
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Insert/Submit a new project
export const submit = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    description: v.string(),
    tech: v.array(v.string()),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      stars: 1,
      contributors: 1,
      forks: 0,
      featured: false,
    });
  },
});
