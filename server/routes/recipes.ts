import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { recipes } from "../db/schema";

export const recipesRoute = new Hono()
  .get("/", getUser, async (c) => {
    try {
      const { userId } = c.var.user;

      const data = await db.query.recipes.findMany({
        where: eq(recipes.user_id, userId),
        orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
        columns: {
          id: true,
          name: true,
          image_url: true,
        },
      });

      return c.json({ data });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .get("/:id", getUser, (c) => {
    try {
      const id = c.req.param("id");
      return c.json({ id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
