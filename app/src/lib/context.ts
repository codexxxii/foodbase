import type { Recipe } from "@server/shared-types";
import { create } from "zustand";

type ContextProps = {
    input: string
    setInput: (input: string) => void()
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  filteredRecipes: () => Recipe[];
};

export const context = create<ContextProps>((set, get) => ({
    recipes: [],
    setRecipes: (recipes) => set({ recipes }),
    filteredRecipes: () => {
        const { input, recipes } = get()

        const data = 
    }
}));
