import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all pitches (admin check logic can be added later)
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pitches").collect();
  },
});

// Submit a new startup proposal
export const submit = mutation({
  args: {
    teamName: v.string(),
    projectTitle: v.string(),
    problemDescription: v.string(),
    solutionDetails: v.string(),
    githubLink: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pitches", {
      ...args,
      submittedAt: Date.now(),
    });
  },
});
