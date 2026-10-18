import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  image_url: z.url().min(1),
  description: z.string().min(1).max(300),
  prep_time: z.string(),
  cook_time: z.string(),
  servings: z.string().min(1),
  category: z.string().min(1),
  ingredients: z
    .array(
      z.object({
        amount: z.string().min(1),
        ingredient: z.string().min(1),
      }),
    )
    .min(1),
  instructions: z
    .array(
      z.object({
        instruction: z.string().min(1),
      }),
    )
    .min(1),
});

export const recipeSchema = formSchema.extend({
  user_id: z.string().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;
