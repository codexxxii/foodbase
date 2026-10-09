import { TrashIcon } from "lucide-react";
import { deleteRecipe } from "@/lib/api";
import { toast } from "sonner";
import { Navigate } from "@tanstack/react-router";

export default function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  const onSubmit = () => {
    toast.promise(
      async () => {
        await deleteRecipe(recipeId);
      },
      {
        success: () => {
          return Navigate({ to: "/recipes" });
        },
        loading: "Deleting recipe...",
        error: "Something went wrong, try again",
      },
    );
  };

  return (
    <>
      <button
        className="border-none! w-8! p-0! bg-red-200 text-red-700 grid place-items-center"
        onClick={() => onSubmit()}
      >
        <TrashIcon size={12} />
      </button>
    </>
  );
}
