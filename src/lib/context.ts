import { create } from "zustand";

type ContextProps = {
  deleteRecipeModal: boolean;
  setDeleteRecipeModal: (deleteRecipeModal: boolean) => void;
};

export const context = create<ContextProps>((set) => ({
  deleteRecipeModal: false,
  setDeleteRecipeModal: (deleteRecipeModal) => set({ deleteRecipeModal }),
}));
