import { TrashIcon } from "lucide-react";

export default function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  return (
    <>
      <button
        className="border-none! w-8! p-0! bg-red-200 text-red-700 grid place-items-center"
        // onClick={() => onSubmit("delete")}
      >
        <TrashIcon size={12} />
      </button>
    </>
  );
}
