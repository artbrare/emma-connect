import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  conversations: defineTable({
    userId: v.id("users"),
    title: v.string(),
  }).index("by_user", ["userId"]),
  messages: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    content: v.string(),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"]),
});
