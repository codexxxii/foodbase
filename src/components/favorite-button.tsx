"use client";

import { HeartIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { checkFavorites } from "@/server/actions";
import { cn } from "@/lib/utils";
import { createFavorite, deleteFavorite } from "@/server/actions";
import { queryClient } from "./providers";

export default function FavoriteButton({ recipeId }: { recipeId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => checkFavorites(recipeId),
  });

  return (
    <>
      {isPending && (
        <button className="w-8 h-8 p-0! grid place-items-center border-none! bg-white">
          <div className="w-3 h-3 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
        </button>
      )}
      {error && <div />}
      {data &&
        (data.id ? (
          <button
            onClick={() => {
              deleteFavorite(recipeId);
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
            }}
            className="w-8 h-8 p-0! grid place-items-center border-none! bg-blue-200 text-blue-700"
          >
            <HeartIcon size={12} />
          </button>
        ) : (
          <button
            onClick={() => {
              createFavorite(recipeId);
              queryClient.invalidateQueries({ queryKey: ["favorites"] });
            }}
            className="w-8 h-8 p-0! grid place-items-center border-none! bg-white"
          >
            <HeartIcon size={12} />
          </button>
        ))}
    </>
  );
}
