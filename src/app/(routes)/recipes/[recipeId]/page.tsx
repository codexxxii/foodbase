import DeleteButton from "@/components/delete-button";
import FavoriteButton from "@/components/favorite-button";
import RecipeSkeleton from "@/components/recipe-skeleton";
import { getRecipe } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  const { recipeId } = await params;

  return (
    <div>
      <Suspense fallback={<RecipeSkeleton />}>
        <Recipe recipeId={recipeId} />
      </Suspense>
    </div>
  );
}

async function Recipe({ recipeId }: { recipeId: string }) {
  const data = await getRecipe(recipeId);

  if (!data) {
    return (
      <div className="w-full h-55 grid place-items-center">
        <p className="text-sm text-gray-400">Recipe does not exist</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-24 border-b border-b-gray-200 px-5 flex justify-between items-center relative">
        <p className="text-5xl font-black tracking-tighter">{data.name}</p>
        <div className="absolute top-0 right-0 flex border-l border-l-gray-200 border-b border-b-gray-200 bg-gray-200 gap-px">
          <FavoriteButton recipeId={recipeId} />
          <DeleteButton recipeId={recipeId} />
        </div>
      </div>
      <div className="w-full flex h-100 border-b border-b-gray-200">
        <div className="w-1/2 h-full border-r border-r-gray-200">
          <img
            src={data.image_url}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <p>Prep Time</p>
            <p>{data.prep_time} mins</p>
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <p>Cook Time</p>
            <p>{data.cook_time} mins</p>
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <p>Servings</p>
            <p>{data.servings}</p>
          </div>
          <div className="w-full h-[calc(400px/6)] border-b border-b-gray-200 px-5 flex justify-between items-center">
            <p>Category</p>
            <p className="capitalize">{data.category}</p>
          </div>
          <div className="w-full grow px-5 py-2.5">
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/2 border-r border-r-gray-200">
          <div className="w-full h-14 border-b border-b-gray-200 border-r border-r-gray-200 px-5 flex justify-between items-center">
            <p className="text-2xl font-black tracking-tighter">Ingredients</p>
          </div>
          {data.ingredients.map((ing) => (
            <div
              className="w-full py-2.5 px-5 flex justify-start items-center gap-2 border-b border-b-gray-200"
              key={ing.id}
            >
              <span className="font-black">-</span>
              <p>
                {ing.amount} {ing.ingredient}
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
            <p className="text-2xl font-black tracking-tighter">Instructions</p>
          </div>
          {data.instructions.map((ins, index) => (
            <div
              key={ins.id}
              className="w-full px-5 py-2.5 border-b border-gray-200"
            >
              <p>
                <span className="font-black">{index + 1}</span>.{" "}
                {ins.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
