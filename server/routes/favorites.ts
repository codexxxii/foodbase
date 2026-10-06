import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { favorites } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { insertFavoriteSchema, recipeIdSchema } from "../shared-types";

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

      const validSchema = insertFavoriteSchema.parse({
        recipe_id: body.recipeId,
        user_id: userId,
      });

      const result = await db
        .insert(favorites)
        .values(validSchema)
        .returning()
        .then((res) => res[0]);

      return c.json({ result });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .delete("/delete", getUser, zValidator("json", recipeIdSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const body = c.req.valid("json");

      const result = await db
        .delete(favorites)
        .where(
          and(
            eq(favorites.recipe_id, body.recipeId),
            eq(favorites.user_id, userId),
          ),
        )
        .returning()
        .then((res) => res[0]);

      return c.json({ result });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
