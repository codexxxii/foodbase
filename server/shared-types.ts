import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).max(300),
  image_url: z.url().min(1),
  prep_time: z.string().min(1),
  cook_time: z.string().min(1),
  servings: z.string().min(1),
  category: z.string().min(1),
  instructions: z.array(z.object({ instruction: z.string().min(1) })).min(1),
  ingredients: z.array(
    z.object({ amount: z.string().min(1), ingredient: z.string().min(1) }),
  ),
});

export type Recipe = z.infer<typeof recipeSchema>;
