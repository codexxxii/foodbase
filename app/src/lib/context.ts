import { create } from "zustand";

type Recipe = {
  id: string;
  name: string;
  image_url: string;
};

type ContextProps = {
  input: string;
  setInput: (input: string) => void;
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  filteredRecipes: () => Recipe[];
};

export const context = create<ContextProps>((set, get) => ({
  input: "",
  setInput: (input) => set({ input }),
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  filteredRecipes: () => {
    const { input, recipes } = get();
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(input.toLowerCase()),
    );
  },
}));
