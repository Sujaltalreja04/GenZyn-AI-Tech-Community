import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all resources
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("resources").collect();
  },
});

// Increment download counter
export const incrementDownload = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, args) => {
    const resource = await ctx.db.get(args.id);
    if (!resource) {
      throw new Error("Resource not found");
    }
    await ctx.db.patch(args.id, {
      downloads: resource.downloads + 1,
    });
  },
});
