"use client";

import { cn } from "@/lib/utils";
import { createFavorite, deleteFavorite } from "@/server/actions";
import { Heart } from "lucide-react";

export default function FavoritesButton({
  recipeId,
  favorite,
}: {
  recipeId: string;
  favorite: boolean;
}) {
  const handleFavorite = async () => {
    if (favorite) {
      await deleteFavorite(recipeId);
    } else {
      await createFavorite(recipeId);
    }
  };

  return (
    <div
      onClick={handleFavorite}
      className={cn(
        "w-1/2 h-full grid place-items-center border-r border-r-gray-200 cursor-pointer",
        favorite ? "bg-blue-400 text-blue-50" : "bg-blue-50 text-blue-400",
      )}
    >
      <Heart size={12} />
    </div>
  );
}
