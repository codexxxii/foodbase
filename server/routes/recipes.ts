import { Hono } from "hono";
import { getUser } from "../clerk";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { ingredients, instructions, recipes } from "../db/schema";
import { zValidator } from "@hono/zod-validator";
import { recipeIdSchema, recipeSchema, validRecipe } from "../shared-types";

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
  .get("/:id", getUser, async (c) => {
    try {
      const { userId } = c.var.user;
      const id = c.req.param("id");

      const recipe = await db.query.recipes.findFirst({
        where: and(eq(recipes.user_id, userId), eq(recipes.id, id)),
        with: {
          ingredients: true,
          instructions: true,
        },
      });

      if (!recipe) {
        return c.json({ success: false, recipe: null });
      }

      return c.json({ success: true, recipe });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .post("/", getUser, zValidator("json", recipeSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const body = c.req.valid("json");

      const RECIPE = {
        user_id: userId,
        name: body.name,
        description: body.description,
        prep_time: body.prep_time,
        cook_time: body.cook_time,
        servings: body.servings,
        category: body.category,
        image_url: body.image_url,
      };

      const INGREDIENTS = body.ingredients;

      const INSTRUCTIONS = body.instructions;

      const validSchema = validRecipe.parse(RECIPE);

      // 1. Create the recipe
      const [recipe] = await db.insert(recipes).values(validSchema).returning({
        id: recipes.id,
      });

      if (!recipe) {
        throw new Error("Failed to create recipe");
      }

      // 2. Insert ingredients using the recipe ID
      await db.insert(ingredients).values(
        INGREDIENTS.map((ingredient) => ({
          recipe_id: recipe.id,
          amount: ingredient.amount,
          ingredient: ingredient.ingredient,
        })),
      );

      // 3. Insert instructions using the recipe ID
      await db.insert(instructions).values(
        INSTRUCTIONS.map((instruction) => ({
          recipe_id: recipe.id,
          instruction: instruction.instruction,
        })),
      );

      // Return whatever you need

      return c.json({ recipe });
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
  .delete("/", getUser, zValidator("json", recipeIdSchema), async (c) => {
    try {
      const { userId } = c.var.user;
      const { recipeId } = c.req.valid("json");

      const result = await db
        .delete(recipes)
        .where(and(eq(recipes.user_id, userId), eq(recipes.id, recipeId)))
        .returning()
        .then((res) => res[0]);

      return c.json({ result });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
