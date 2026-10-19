import { getRecipes } from "@/server/actions";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

export default async function RecipesPage() {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return (
    <div>
      <div className="w-full h-24 border-b border-b-gray-200 px-5 flex justify-start items-center">
        <p className="font-black tracking-tighter text-5xl">Recipes</p>
      </div>
      <Suspense
        fallback={
          <div className="w-full h-55 grid place-items-center">
            <div className="w-4 h-4 rounded-full border border-gray-400 animate-spin border-r-transparent!" />
          </div>
        }
      >
        <Recipes />
      </Suspense>
    </div>
  );
}

async function Recipes() {
  const data = await getRecipes();

  return (
    <div className="w-full">
      {data.length < 1 ? (
        <div className="w-full h-55 grid place-items-center">
          <p className="text-sm text-gray-400">No recipes found</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-5 place-items-start">
          {data.map((recipe) => (
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
    </div>
  );
}
