import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";
import { type Recipe } from "@server/shared-types";
import { queryClient } from "@/main";

const api = hc<ApiRoutes>("/").api;

// Current User
export async function getCurrentUser() {
  try {
    const res = await api["current-user"].$get();

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Recipes
export async function getRecipes() {
  try {
    const res = await api.recipes.$get();

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createRecipe(recipe: Recipe) {
  try {
    const res = await api.recipes.$post({ json: recipe });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecipe(id: string) {
  try {
    const res = await api.recipes[":id"].$get({ param: { id } });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Favorites
export async function getFavorite(id: string) {
  try {
    const res = await api.favorites[":id"].$get({ param: { id } });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createFavorite(recipeId: string) {
  try {
    const res = await api.favorites.create.$post({ json: { recipeId } });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    queryClient.invalidateQueries({ queryKey: ["favorite"] });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFavorite(recipeId: string) {
  try {
    const res = await api.favorites.delete.$delete({ json: { recipeId } });

    if (!res.ok) {
      throw new Error("SERVER ERROR");
    }

    const data = await res.json();

    queryClient.invalidateQueries({ queryKey: ["favorite"] });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
