import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { favorites } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { recipeIdSchema } from "../shared-types";

export const favoritesRoute = new Hono()
  .get("/:id", getUser, async (c) => {
    try {
      const { userId } = c.var.user;
      const id = c.req.param("id");

      const exists = await db.query.favorites.findFirst({
        where: and(eq(favorites.user_id, userId), eq(favorites.recipe_id, id)),
      });

      if (!exists) {
        return c.json({ favorited: false });
      }

      return c.json({ favorited: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .post("/create", getUser, zValidator("json", recipeIdSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const body = c.req.valid("json");
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .post("/delete", getUser, zValidator("json", recipeIdSchema), async (c) => {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
