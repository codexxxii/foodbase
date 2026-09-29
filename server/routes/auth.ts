import { Hono } from "hono";
import { getUser } from "../clerk";

export const authRoute = new Hono().get("/current-user", getUser, async (c) => {
  try {
    const { userId } = c.var.user;
    const clerkClient = c.get("clerk");

    const userData = await clerkClient.users.getUser(userId);

    return c.json({ userData });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
