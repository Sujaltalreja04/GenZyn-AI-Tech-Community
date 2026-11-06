import { mutation } from "./_generated/server";
import { v } from "convex/values";

const email = v.string();

// Before the React forms call these functions, enable a bot-control provider
// (for example Turnstile) and pass verification through an action.
export const contact = mutation({
  args: { name: v.string(), email, subject: v.optional(v.string()), message: v.string(), consentToContact: v.boolean() },
  handler: async (ctx, args) => {
    if (!args.consentToContact) throw new Error("Consent is required before submitting contact details.");
    return await ctx.db.insert("contacts", { ...args, email: args.email.toLowerCase(), status: "new", submittedAt: Date.now(), source: "website" });
  },
});

export const subscribe = mutation({
  args: { email },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase();
    const existing = await ctx.db.query("subscribers").withIndex("by_email", (q) => q.eq("email", normalizedEmail)).unique();
    if (existing) {
      if (existing.status === "unsubscribed") await ctx.db.patch(existing._id, { status: "active", consentAt: Date.now(), unsubscribedAt: undefined });
      return existing._id;
    }
    return await ctx.db.insert("subscribers", { email: normalizedEmail, consentAt: Date.now(), source: "website", status: "active" });
  },
});

export const rsvp = mutation({
  args: { eventId: v.id("events"), name: v.string(), email, phone: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase();
    const existing = await ctx.db.query("rsvps").withIndex("by_event_email", (q) => q.eq("eventId", args.eventId).eq("email", normalizedEmail)).unique();
    if (existing) return existing._id;
    return await ctx.db.insert("rsvps", { ...args, email: normalizedEmail, status: "new", registeredAt: Date.now(), source: "website" });
  },
});
