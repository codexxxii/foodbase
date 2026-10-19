"use server";

import { and, eq, ilike } from "drizzle-orm";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import {
  favorites,
  ingredients,
  instructions,
  recipes,
  users,
} from "./db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type FormSchema, recipeSchema } from "../../shared-types";

// Users
export async function authCheck() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const userExists = await db.query.users.findFirst({
      where: eq(users.clerk_id, userId),
    });

    if (!userExists) {
      await db.insert(users).values({ clerk_id: userId });
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userId: string) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const newUser = await db
      .insert(users)
      .values({ clerk_id: userId })
      .returning();

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const newUser = await db
      .delete(users)
      .where(eq(users.clerk_id, userId))
      .returning();

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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

export async function createRecipe(recipe: FormSchema) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const validSchema = recipeSchema.parse({
      ...recipe,
      user_id: userId,
    });

    const [newRecipe] = await db
      .insert(recipes)
      .values(validSchema)
      .returning({ id: recipes.id });

    await db.insert(ingredients).values(
      recipe.ingredients.map((ing) => ({
        ...ing,
        user_id: userId,
        recipe_id: newRecipe.id,
      })),
    );

    await db.insert(instructions).values(
      recipe.instructions.map((ins) => ({
        ...ins,
        recipe_id: newRecipe.id,
      })),
    );

    return newRecipe;
  } catch (error) {
    console.log(error);
    throw error;
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

export async function getFavorites() {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  try {
    const data = await db.query.favorites.findMany({
      orderBy: (favorites, { desc }) => [desc(favorites.created_at)],
      where: eq(favorites.user_id, userId),
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

    const recipes = data.map((recipe) => recipe.recipe);

    return recipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
