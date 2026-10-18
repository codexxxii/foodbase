import { createUser, deleteUser } from "@/server/actions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (!evt.data.id) return;

    if (evt.type === "user.created") {
      await createUser(evt.data.id);
    }

    if (evt.type === "user.deleted") {
      await deleteUser(evt.data.id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
