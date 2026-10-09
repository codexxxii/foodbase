import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteRecipes } from "@/lib/api";
import IsLoading from "@/components/is-loading";
import Error from "@/components/error";

export const Route = createFileRoute("/_authorized/favorites/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorite-recipes"],
    queryFn: getFavoriteRecipes,
  });

  return (
    <div>
      <div className="w-full h-28 border-b border-b-gray-200 px-5 flex justify-between items-center">
        <p className="text-5xl font-black tracking-tighter">Favorites</p>
      </div>
      {isLoading && <IsLoading />}
      {error && <Error />}
      {data && (
        <>
          {data.data.length < 1 ? (
            <div className="w-full h-32 grid place-items-center">
              <p className="text-sm text-gray-400 text-center">
                No recipes found
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
              {data.data.map((recipe) => (
                <Link
                  to="/recipes/$recipeId"
                  params={{ recipeId: recipe.recipe.id }}
                  key={recipe.id}
                  className="w-full h-55"
                >
                  <div className="w-full h-full relative group">
                    <img
                      src={recipe.recipe.image_url}
                      alt={recipe.recipe.name}
                      className="w-full h-full object-cover grayscale duration-500 transform-all ease-in-out group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black flex justify-start items-end p-2 duration-500 transform-all ease-in-out group-hover:opacity-0">
                      <p className="text-white text-lg tracking-tighter font-black">
                        {recipe.recipe.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
