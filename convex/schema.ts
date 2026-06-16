import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Open Source Projects Table
  projects: defineTable({
    title: v.string(),
    category: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    tech: v.array(v.string()),
    stars: v.number(),
    contributors: v.number(),
    forks: v.number(),
    link: v.string(),
    featured: v.optional(v.boolean()),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"]),

  // Hackathons & Workshops Events Table
  events: defineTable({
    title: v.string(),
    date: v.string(),
    description: v.string(),
    type: v.string(), // e.g., Hackathon, Workshop, Conference
    tags: v.array(v.string()),
    link: v.string(),
    isFeatured: v.optional(v.boolean()),
    isPast: v.optional(v.boolean()),
    attendees: v.optional(v.number()),
    highlights: v.optional(v.string()),
  })
    .index("by_type", ["type"])
    .index("by_featured", ["isFeatured"]),

  // Event RSVPs Table (linking users to events)
  rsvps: defineTable({
    eventId: v.id("events"),
    name: v.string(),
    email: v.string(),
    registeredAt: v.number(), // timestamp
  })
    .index("by_event", ["eventId"])
    .index("by_email", ["email"]),

  // Newsletter Subscribers Table
  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(), // timestamp
  })
    .index("by_email", ["email"]),

  // Incubator Startup Pitch Proposals Table
  pitches: defineTable({
    teamName: v.string(),
    projectTitle: v.string(),
    problemDescription: v.string(),
    solutionDetails: v.string(),
    githubLink: v.string(),
    submittedAt: v.number(), // timestamp
  })
    .index("by_team", ["teamName"]),

  // Curated Developer Resources Table
  resources: defineTable({
    title: v.string(),
    category: v.string(),
    type: v.string(), // e.g., PDF, Guide, Boilerplate
    duration: v.string(),
    tag: v.string(),
    description: v.string(),
    difficulty: v.string(), // Beginner, Intermediate, Advanced
    downloads: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_difficulty", ["difficulty"]),
});
