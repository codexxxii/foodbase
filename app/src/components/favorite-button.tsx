import { HeartIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createFavorite, deleteFavorite, getFavorite } from "@/lib/api";

export default function FavoriteButton({ recipeId }: { recipeId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getFavorite(recipeId),
  });

  const onSubmit = async (type: "create" | "delete") => {
    if (type === "create") {
      const data = await createFavorite(recipeId);
      return data;
    } else if (type === "delete") {
      const data = await deleteFavorite(recipeId);
      return data;
    }
  };

  return (
    <>
      {isLoading && (
        <button className="border-none! w-8! p-0! bg-white text-black grid place-items-center absolute top-0 right-0">
          <div className="w-2.5 h-2.5 rounded-full border border-gray-400 border-r-transparent! animate-spin" />
        </button>
      )}
      {data &&
        (data.favorited ? (
          <button
            className="border-none! w-8! p-0! bg-red-200 text-red-700 grid place-items-center absolute top-0 right-0"
            onClick={() => onSubmit("delete")}
          >
            <HeartIcon size={12} />
          </button>
        ) : (
          <button
            className="border-none! w-8! p-0! bg-white text-black grid place-items-center absolute top-0 right-0"
            onClick={() => onSubmit("create")}
          >
            <HeartIcon size={12} />
          </button>
        ))}
    </>
  );
}
