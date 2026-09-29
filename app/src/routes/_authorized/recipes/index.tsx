import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/lib/api";
import IsLoading from "@/components/is-loading";
import Error from "@/components/error";

export const Route = createFileRoute("/_authorized/recipes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <div>
      <div className="w-full h-28 border-b border-b-gray-200 px-5 flex justify-between items-center">
        <p className="space-grotesk text-5xl font-black tracking-tighter">
          Recipes
        </p>
        <div className="flex items-center gap-1 px-5 w-75 h-8 border border-gray-200">
          <SearchIcon size={12} className="-translate-y-px" />
          <input
            type="text"
            placeholder="Search"
            className="text-sm grow outline-none"
          />
        </div>
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
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {data.data.map((recipe) => (
                <Link
                  to="/recipes/$recipeId"
                  params={{ recipeId: recipe.id }}
                  key={recipe.id}
                >
                  <div>
                    <p>{recipe.name}</p>
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
