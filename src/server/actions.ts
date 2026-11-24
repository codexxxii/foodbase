"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import {
  createFavoriteSchema,
  createIngredientSchema,
  createRecipeSchema,
  favorites,
  ingredients,
  recipes,
} from "./db/schema";
import { type Recipe } from "@/lib/types";
import { redirect } from "next/navigation";
import { and, eq, ilike } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Auth
async function getUserId() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return userId;
}

// Recipes
export async function createRecipe(recipe: Recipe) {
  const userId = await getUserId();

  try {
    const {
      name,
      description,
      image_url,
      prep_time,
      cook_time,
      servings,
      category,
      ingredients: ings,
      instructions,
    } = recipe;

    const ins = instructions.map((i) => i.instruction);

    const validSchema = createRecipeSchema.parse({
      user_id: userId,
      name,
      description,
      image_url,
      prep_time,
      cook_time,
      servings,
      category,
      instructions: ins,
    });

    const [newRecipe] = await db
      .insert(recipes)
      .values(validSchema)
      .returning({ id: recipes.id });

    const newIngs = ings.map((i) => {
      const validSchema = createIngredientSchema.parse({
        ...i,
        user_id: userId,
        recipe_id: newRecipe.id,
      });
      return validSchema;
    });

    await db.insert(ingredients).values(newIngs);

    redirect(`/recipes/${newRecipe.id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategory(category: string) {
  const userId = await getUserId();

  try {
    const data = await db.query.recipes.findMany({
      where: and(eq(recipes.user_id, userId), eq(recipes.category, category)),
      columns: {
        id: true,
        name: true,
        image_url: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecipes() {
  const userId = await getUserId();

  try {
    const data = await db.query.recipes.findMany({
      where: eq(recipes.user_id, userId),
      columns: {
        id: true,
        name: true,
        image_url: true,
      },
      orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecipe(recipeId: string) {
  const userId = await getUserId();

  try {
    const data = await db.query.recipes.findFirst({
      where: and(eq(recipes.user_id, userId), eq(recipes.id, recipeId)),
      with: {
        ingredients: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteRecipe(recipeId: string) {
  const userId = await getUserId();

  try {
    const recipe = await db.query.recipes.findFirst({
      where: and(eq(recipes.id, recipeId), eq(recipes.user_id, userId)),
    });

    if (!recipe) {
      throw new Error("Error: Recipe does not exist");
    }

    await db.delete(recipes).where(eq(recipes.id, recipe.id));

    redirect("/recipes");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Favorites
export async function createFavorite(recipeId: string) {
  const userId = await getUserId();

  try {
    const validSchema = createFavoriteSchema.parse({
      recipe_id: recipeId,
      user_id: userId,
    });

    await db.insert(favorites).values(validSchema);

    revalidatePath("/recipes/:id");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFavorite(recipeId: string) {
  const userId = await getUserId();

  try {
    const data = await db.query.favorites.findFirst({
      where: and(
        eq(favorites.user_id, userId),
        eq(favorites.recipe_id, recipeId),
      ),
    });

    if (!data) {
      throw new Error("Error: Favorite does not exist");
    }

    await db
      .delete(favorites)
      .where(
        and(eq(favorites.user_id, userId), eq(favorites.recipe_id, recipeId)),
      );

    revalidatePath("/recipes/:id");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFavorite(recipeId: string) {
  const userId = await getUserId();

  try {
    const favorite = await db.query.favorites.findFirst({
      where: and(
        eq(favorites.recipe_id, recipeId),
        eq(favorites.user_id, userId),
      ),
    });

    if (favorite) {
      return { favorite: true };
    } else {
      return { favorite: false };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFavorites() {
  const userId = await getUserId();

  try {
    const data = await db.query.favorites.findMany({
      where: eq(favorites.user_id, userId),
      orderBy: (favorites, { desc }) => [desc(favorites.created_at)],
      columns: {
        id: true,
      },
      with: {
        recipe: {
          columns: {
            id: true,
            name: true,
            image_url: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Search
export async function getSearch(query: string) {
  const userId = await getUserId();

  try {
    const recipesData = await db.query.recipes.findMany({
      where: and(
        eq(recipes.user_id, userId),
        ilike(recipes.name, `%${query}%`),
      ),
      columns: {
        id: true,
        name: true,
        image_url: true,
      },
      orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
    });

    const ingsList = await db.query.ingredients.findMany({
      where: and(
        eq(ingredients.user_id, userId),
        ilike(ingredients.ingredient, `%${query}%`),
      ),
      columns: {
        id: true,
      },
      with: {
        recipe: {
          columns: {
            id: true,
            name: true,
            image_url: true,
          },
        },
      },
    });

    const ingsData = ingsList.map((ing) => ing.recipe);

    return { recipes: recipesData, ingredientsList: ingsData };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
