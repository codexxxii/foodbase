import RecipeControls from "@/components/recipe-controls";
import { getRecipe } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  await auth.protect();

  const { recipeId } = await params;
  const recipe = await getRecipe(recipeId);

  if (!recipe) {
    return (
      <div className="w-full h-44 grid place-items-center">
        <p className="text-sm text-gray-400">Recipe does not exist</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-24 px-5 border-b border-b-gray-200 flex justify-start items-center relative">
        <p className="text-5xl font-semibold tracking-tighter">{recipe.name}</p>
        <RecipeControls recipeId={recipeId} />
      </div>
      <div className="w-full h-100 flex border-b border-b-gray-200">
        <div className="w-1/2 h-full border-r border-r-gray-200 relative z-0">
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
            <p>Prep Time:</p>
            <p>
              {recipe.prep_time}{" "}
              <span className="text-sm text-gray-400">mins</span>
            </p>
          </div>
          <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
            <p>Cook Time:</p>
            <p>
              {recipe.cook_time}{" "}
              <span className="text-sm text-gray-400">mins</span>
            </p>
          </div>
          <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
            <p>Servings:</p>
            <p>{recipe.servings}</p>
          </div>
          <div className="w-full h-[calc(100%/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
            <p>Category:</p>
            <p className="capitalize">{recipe.category}</p>
          </div>
          <div className="w-full grow px-5 py-2.5">
            <p>{recipe.description}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex min-h-[calc(100vh-556px)]">
        <div className="w-1/2 border-r border-r-gray-200">
          <div className="w-full h-14 px-5 border-b border-b-gray-200 flex justify-start items-center">
            <p className="text-3xl font-semibold tracking-tighter">
              Ingredients
            </p>
          </div>
          {recipe.ingredients.map((ing) => (
            <div
              className="w-full h-14 px-5 flex justify-start items-center border-b border-b-gray-200"
              key={ing.id}
            >
              <p>
                - {ing.amount} {ing.ingredient}
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/2 border-r border-r-gray-200">
          <div className="w-full h-14 px-5 border-b border-b-gray-200 flex justify-start items-center">
            <p className="text-3xl font-semibold tracking-tighter">
              Instructions
            </p>
          </div>
          {recipe.instructions.map((ins, index) => (
            <div
              className="w-full py-3.25 px-5 flex justify-start items-center gap-3 border-b border-b-gray-200"
              key={index}
            >
              <div className="w-7.5 h-7.5 bg-black text-white text-sm grid place-items-center">
                <p>{index + 1}</p>
              </div>
              <p>{ins}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
