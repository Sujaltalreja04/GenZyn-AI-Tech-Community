import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user RSVPs by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rsvps")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

// Create RSVP registration
export const register = mutation({
  args: {
    eventId: v.id("events"),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rsvps")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (existing) {
      return existing; // already registered
    }

    return await ctx.db.insert("rsvps", {
      ...args,
      registeredAt: Date.now(),
    });
  },
});

// Cancel RSVP registration
export const cancel = mutation({
  args: { id: v.id("rsvps") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
