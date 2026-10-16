import { getSearch } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  const { query } = await searchParams;

  return (
    <div>
      <div className="w-full h-14 px-5 flex justify-start items-center border-b border-b-gray-200">
        <p className="text-2xl font-black tracking-tighter">Recipes</p>
      </div>
      <div className="w-full min-h-55 border-b border-b-gray-200">
        <Suspense
          fallback={
            <div className="w-full h-55 grid place-items-center">
              <div className="w-4 h-4 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
            </div>
          }
        >
          <Recipes query={query} type="recipe" />
        </Suspense>
      </div>
      <div className="w-full h-14 px-5 flex justify-start items-center border-b border-b-gray-200">
        <p className="text-2xl font-black tracking-tighter">
          Recipes that include: {query}
        </p>
      </div>
      <div className="w-full min-h-55 border-b border-b-gray-200">
        <Suspense
          fallback={
            <div className="w-full h-55 grid place-items-center">
              <div className="w-4 h-4 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
            </div>
          }
        >
          <Recipes query={query} type="ingredient" />
        </Suspense>
      </div>
    </div>
  );
}

async function Recipes({
  query,
  type,
}: {
  query: string;
  type: "recipe" | "ingredient";
}) {
  const data = await getSearch(query);

  return (
    <div className="w-full grid">
      {type === "recipe" ? (
        <>
          {data.recipes.length < 1 ? (
            <div className="w-full h-55 grid place-items-center">
              <p className="text-sm text-gray-400">No recipes found</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-5 place-items-start">
              {data.recipes.map((recipe) => (
                <Link
                  className="w-full h-55"
                  href={`/recipes/${recipe.id}`}
                  key={recipe.id}
                >
                  <div className="w-full h-full relative group">
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-full object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
                    />
                    <div className="w-full h-full absolute top-0 bg-linear-to-b from-transparent to-black flex justify-start items-end p-2.5 transition-all ease-in-out duration-500 group-hover:opacity-0">
                      <p className="font-black text-white tracking-tighter">
                        {recipe.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {data.ingredients.length < 1 ? (
            <div className="w-full h-55 grid place-items-center">
              <p className="text-sm text-gray-400">No recipes found</p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-5 place-items-start">
              {data.ingredients.map((recipe) => (
                <Link
                  className="w-full h-55"
                  href={`/recipes/${recipe.id}`}
                  key={recipe.id}
                >
                  <div className="w-full h-full relative group">
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-full object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
                    />
                    <div className="w-full h-full absolute top-0 bg-linear-to-b from-transparent to-black flex justify-start items-end p-2.5 transition-all ease-in-out duration-500 group-hover:opacity-0">
                      <p className="font-black text-white tracking-tighter">
                        {recipe.name}
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
