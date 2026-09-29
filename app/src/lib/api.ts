import { hc } from "hono/client";
import type { ApiRoutes } from "@server/app";

const api = hc<ApiRoutes>("/").api;

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
