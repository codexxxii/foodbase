import { getAuth } from "@clerk/hono";
import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    user: any;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const user = getAuth(c);

    if (!user.isAuthenticated) {
      return c.json({ error: "UNAUTHORIZED" });
    }

    c.set("user", user);
    await next();

    return c.json({ user });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
