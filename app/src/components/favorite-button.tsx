import { HeartIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFavorite } from "@/lib/api";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recipeIdSchema,
  type Recipe,
  type RecipeId,
} from "@server/shared-types";

export default function FavoriteButton({ recipeId }: { recipeId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getFavorite(recipeId),
  });

  const form = useForm<RecipeId>({
    resolver: zodResolver(recipeIdSchema),
    defaultValues: {
      recipeId: "",
    },
  });

  const onSubmit = (values: RecipeId) => {
    console.log(values);
  };

  return (
    <>
      {isLoading && (
        <button className="border-none! w-8! p-0! bg-white text-black grid place-items-center absolute top-0 right-0">
          <div className="w-2.5 h-2.5 rounded-full border border-gray-400 border-r-transparent! animate-spin" />
        </button>
      )}
      {data && (
        <FormProvider {...form}>
          {data.favorited ? (
            <button className="border-none! w-8! p-0! bg-red-50 text-red-400 grid place-items-center absolute top-0 right-0">
              <HeartIcon size={12} />
            </button>
          ) : (
            <button className="border-none! w-8! p-0! bg-white text-black grid place-items-center absolute top-0 right-0">
              <HeartIcon size={12} />
            </button>
          )}
        </FormProvider>
      )}
    </>
  );
}
