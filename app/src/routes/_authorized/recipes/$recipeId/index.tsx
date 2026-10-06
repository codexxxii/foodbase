import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/lib/api";
import IsLoading from "@/components/is-loading";
import Error from "@/components/error";
import FavoriteButton from "@/components/favorite-button";

export const Route = createFileRoute("/_authorized/recipes/$recipeId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { recipeId } = Route.useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipe(recipeId),
  });

  return (
    <div>
      {isLoading && <IsLoading />}
      {error && <Error />}

      {data && (
        <>
          {!data.recipe ? (
            <div className="w-full h-32 grid place-items-center">
              <p className="text-sm text-gray-400 text-center">
                No recipe found
              </p>
            </div>
          ) : (
            <div>
              <div className="w-full h-32 border-b border-b-gray-200 px-5 flex justify-start items-center">
                <p className="text-5xl font-black tracking-tighter">
                  {data.recipe.name}
                </p>
              </div>
              <div className="w-full h-100 flex border-b border-b-gray-200">
                <div className="w-1/2 h-full border-r border-r-gray-200 relative">
                  <img
                    src={data.recipe.image_url}
                    alt={data.recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <FavoriteButton recipeId={recipeId} />
                </div>
                <div className="w-1/2 h-full flex flex-col">
                  <div className="w-full h-[calc(400px/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
                    <p>Prep time</p>
                    <p>{data.recipe.prep_time}</p>
                  </div>
                  <div className="w-full h-[calc(400px/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
                    <p>Cook time</p>
                    <p>{data.recipe.cook_time}</p>
                  </div>
                  <div className="w-full h-[calc(400px/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
                    <p>Servings</p>
                    <p>{data.recipe.servings}</p>
                  </div>
                  <div className="w-full h-[calc(400px/6)] px-5 flex justify-between items-center border-b border-b-gray-200">
                    <p>Category</p>
                    <p className="capitalize">{data.recipe.category}</p>
                  </div>
                  <div className="w-full grow px-5 py-2.5">
                    <p>{data.recipe.description}</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-1/2 border-r border-r-gray-200">
                  <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
                    <p className="text-2xl font-black tracking-tighter">
                      Ingredients
                    </p>
                  </div>
                  {data.recipe.ingredients.map((ing) => (
                    <div
                      className="w-full flex h-14 border-b border-b-gray-200 items-center px-5"
                      key={ing.id}
                    >
                      <p>
                        - {ing.amount} {ing.ingredient}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-1/2">
                  <div className="w-full h-14 border-b border-b-gray-200 px-5 flex justify-between items-center">
                    <p className="text-2xl font-black tracking-tighter">
                      Instructions
                    </p>
                  </div>
                  {data.recipe.instructions.map((ins, index) => (
                    <div
                      className="w-full py-2.5 flex border-b border-b-gray-200 items-center px-5"
                      key={ins.id}
                    >
                      <p>
                        <span className="font-black">{index + 1}.</span>{" "}
                        {ins.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
