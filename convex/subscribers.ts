import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Subscribe email to newsletter
export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) {
      return existing; // already subscribed
    }

    return await ctx.db.insert("subscribers", {
      email: args.email,
      subscribedAt: Date.now(),
    });
  },
});
