import { createIngredientSchema, createRecipeSchema } from "@/server/db/schema";
import { z } from "zod";

// Recipes
export const recipeSchema = createRecipeSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    user_id: true,
  })
  .extend({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1).max(300),
    image_url: z.string().trim().min(1),
    category: z.string().trim().min(1),
    servings: z.string().trim().min(1),
    prep_time: z.string().trim().min(1),
    cook_time: z.string().trim().min(1),
    instructions: z
      .array(z.object({ instruction: z.string().trim().min(1) }))
      .min(1),
    ingredients: z
      .array(
        z.object({
          amount: z.string().trim().min(1),
          ingredient: z.string().trim().min(1),
        }),
      )
      .min(1),
  });

export type Recipe = z.infer<typeof recipeSchema>;

// Ingredients
export const ingredientSchema = createIngredientSchema
  .omit({
    id: true,
    created_at: true,
    recipe_id: true,
  })
  .extend({
    amount: z.string().trim().min(1),
    ingredient: z.string().trim().min(1),
  });

export type Ingredient = z.infer<typeof ingredientSchema>;
