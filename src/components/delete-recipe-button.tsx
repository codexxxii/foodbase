"use client";

import { deleteRecipe } from "@/server/actions";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <div
        className="w-1/2 h-full grid place-items-center bg-red-50 text-red-400 cursor-pointer"
        onClick={() => setActive(true)}
      >
        <Trash size={12} />
      </div>
      {active && (
        <DeleteRecipeModal recipeId={recipeId} setActive={setActive} />
      )}
    </>
  );
}

function DeleteRecipeModal({
  recipeId,
  setActive,
}: {
  recipeId: string;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteRecipe(recipeId);
  };

  return (
    <div className="fixed inset-0 grid place-items-center z-1000">
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-sm"
        onClick={() => setActive(false)}
      />
      <div className="p-5 bg-white border border-gray-200 relative w-full max-w-2xl space-y-5">
        <div>
          <p className="text-xl font-semibold">Delete recipe</p>
          <p className="text-sm text-gray-400">
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </p>
        </div>
        <div className="w-full flex justify-evenly items-center">
          <button
            className="w-2/5 border-black bg-black text-white"
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            className="w-2/5 border-red-400 text-red-400 bg-red-50 disabled:cursor-not-allowed"
            onClick={onDelete}
          >
            {isDeleting ? "Deleting Recipe..." : "Delete Recipe"}
          </button>
        </div>
      </div>
    </div>
  );
}
