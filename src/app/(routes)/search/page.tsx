import { getSearch } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  await auth.protect();

  const { query } = await searchParams;

  const { recipes, ingredientsList: ingredients } = await getSearch(query);

  console.log(ingredients);
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center px-5 border-b border-gray-200">
        <p className="text-5xl font-semibold tracking-tighter">
          Search results for: {query}
        </p>
      </div>
      <div className="w-full h-14 border-b border-b-gray-200 px-5 flex jsutify-start items-center">
        <p className="text-3xl font-semibold">By name</p>
      </div>
      {recipes.length < 1 ? (
        <div className="w-full h-50 grid place-items-center border-b border-b-gray-200">
          <p className="text-sm text-gray-400">No recipes</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 place-items-start gap-px border-b border-b-gray-200">
          {recipes.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="w-full h-50 relative group"
            >
              <Image
                src={recipe.image_url}
                alt={recipe.name}
                fill
                className="object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
              />
              <div className="absolute b-linear-to-b from-transparent to-black w-full h-full flex justify-start items-end p-3 transition-all ease-in-out duration-500 group-hover:opacity-0">
                <p className="text-white text-lg font-semibold">
                  {recipe.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="w-full h-14 border-b border-b-gray-200 px-5 flex jsutify-start items-center">
        <p className="text-3xl font-semibold">By ingredient</p>
      </div>
      {ingredients.length < 1 ? (
        <div className="w-full h-50 grid place-items-center">
          <p className="text-sm text-gray-400">No recipes</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 place-items-start gap-px">
          {ingredients.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="w-full h-50 relative group"
            >
              <Image
                src={recipe.image_url}
                alt={recipe.name}
                fill
                className="object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
              />
              <div className="absolute b-linear-to-b from-transparent to-black w-full h-full flex justify-start items-end p-3 transition-all ease-in-out duration-500 group-hover:opacity-0">
                <p className="text-white text-lg font-semibold">
                  {recipe.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
