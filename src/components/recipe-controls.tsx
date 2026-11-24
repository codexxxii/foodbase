import { getFavorite } from "@/server/actions";
import FavoritesButton from "./favorites-button";
import DeleteRecipeButton from "./delete-recipe-button";

export default async function RecipeControls({
  recipeId,
}: {
  recipeId: string;
}) {
  const { favorite } = await getFavorite(recipeId);

  return (
    <div className="absolute top-0 right-0 w-15 h-7.5 border-l border-l-gray-200 border-b border-b-gray-200 flex">
      <FavoritesButton recipeId={recipeId} favorite={favorite} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
}
