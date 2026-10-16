"use client";

import { TrashIcon } from "lucide-react";
import { context } from "@/lib/context";
import { useState } from "react";
import { deleteRecipe } from "@/server/actions";

export default function DeleteButton({ recipeId }: { recipeId: string }) {
  const { deleteRecipeModal, setDeleteRecipeModal } = context();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <button
        onClick={() => setDeleteRecipeModal(true)}
        className="w-8 h-8 p-0! grid place-items-center border-none! bg-white"
      >
        <TrashIcon size={12} />
      </button>
      {deleteRecipeModal && (
        <div className="fixed top-0 right-0 inset-0 grid place-items-center">
          <div
            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
            onClick={() => setDeleteRecipeModal(false)}
          />
          <div className="relative z-1000 w-full max-w-md bg-white px-5 py-2.5 shadow border border-gray-200">
            <div className="w-full mb-2.5">
              <p className="text-lg tracking-tighter">
                Are you sure? This action cannot be undone.
              </p>
            </div>
            <div className="w-full flex gap-2.5">
              <button
                onClick={() => setDeleteRecipeModal(false)}
                className="border-red-700! text-red-700 bg-red-200 w-1/2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsDeleting(true);
                  deleteRecipe(recipeId);
                }}
                disabled={isDeleting}
                className="border-black text-white bg-black w-1/2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
