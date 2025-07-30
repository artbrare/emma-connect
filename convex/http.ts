import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Validate webhook signature for security
    const event = await validateRequest(request);
    if (!event) {
      console.error("Invalid webhook signature");
      return new Response("Invalid webhook signature", { status: 400 });
    }

    // Handle different Clerk webhook events
    switch (event.type) {
      case "user.created":
      case "user.updated":
        // Call our internal mutation to create/update user
        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: event.data,
        });
        console.log(`✅ Processed ${event.type} for user ${event.data.id}`);
        break;

      case "user.deleted":
        // Call our internal mutation to delete user
        const clerkUserId = event.data.id!;
        await ctx.runMutation(internal.users.deleteFromClerk, {
          clerkUserId,
        });
        break;

      default:
    }

    // Always return 200 to Clerk so it doesn't retry
    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

// Webhook signature validation function
async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  try {
    // Get raw request body
    const payloadString = await req.text();

    // Get Svix headers that Clerk sends
    const svixHeaders = {
      "svix-id": req.headers.get("svix-id")!,
      "svix-timestamp": req.headers.get("svix-timestamp")!,
      "svix-signature": req.headers.get("svix-signature")!,
    };

    // Check if webhook secret is configured
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return null;
    }

    // Verify webhook signature using Svix
    const wh = new Webhook(webhookSecret);
    const verifiedPayload = wh.verify(
      payloadString,
      svixHeaders
    ) as unknown as WebhookEvent;

    return verifiedPayload;
  } catch (error) {
    return null;
  }
}

export default http;
