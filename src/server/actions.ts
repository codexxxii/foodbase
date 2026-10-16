"use server";

import { and, eq, ilike } from "drizzle-orm";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { favorites, ingredients, recipes } from "./db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Recipes
export async function getRecipes() {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const data = await db.query.recipes.findMany({
      where: eq(recipes.user_id, user.userId),
      orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
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

export async function getRecipe(recipeId: string) {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const data = await db.query.recipes.findFirst({
      where: and(eq(recipes.user_id, user.userId), eq(recipes.id, recipeId)),
      with: {
        ingredients: true,
        instructions: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createRecipe() {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }
}

export async function deleteRecipe(recipeId: string) {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const recipeExists = await db.query.recipes.findFirst({
      where: and(eq(recipes.user_id, userId), eq(recipes.id, recipeId)),
    });

    if (!recipeExists) {
      return { error: "Recipe does not exists" };
    }

    await db
      .delete(recipes)
      .where(and(eq(recipes.id, recipeId), eq(recipes.user_id, userId)));

    redirect("/recipes");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSearch(query: string) {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const recipeSearch = await db.query.recipes.findMany({
      where: and(
        eq(recipes.user_id, userId),
        ilike(recipes.name, `%${query}%`),
      ),
      orderBy: (recipes, { desc }) => [desc(recipes.created_at)],
      columns: {
        id: true,
        name: true,
        image_url: true,
      },
      limit: 20,
    });

    const ingSearch = await db.query.ingredients.findMany({
      where: and(
        eq(ingredients.user_id, userId),
        ilike(ingredients.ingredient, `%${query}%`),
      ),
      orderBy: (ingredients, { desc }) => [desc(ingredients.created_at)],
      with: {
        recipe: {
          columns: {
            id: true,
            name: true,
            image_url: true,
          },
        },
      },
      limit: 20,
    });

    return {
      recipes: recipeSearch,
      ingredients: ingSearch
        .map((ing) => ing.recipe)
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        ),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Favorites
export async function checkFavorites(recipeId: string) {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const favoriteExists = await db.query.favorites.findFirst({
      where: and(
        eq(favorites.recipe_id, recipeId),
        eq(favorites.user_id, user.userId),
      ),
      columns: {
        id: true,
      },
    });

    if (!favoriteExists) {
      return { id: null };
    } else {
      return { id: favoriteExists };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createFavorite(recipeId: string) {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const result = await db
      .insert(favorites)
      .values({ recipe_id: recipeId, user_id: user.userId })
      .returning();

    revalidatePath("/recipes/:id");
    return { result };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFavorite(recipeId: string) {
  const user = await auth();

  if (!user.isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const result = await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.recipe_id, recipeId),
          eq(favorites.user_id, user.userId),
        ),
      )
      .returning();

    revalidatePath("/recipes/:id");
    return { result };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
