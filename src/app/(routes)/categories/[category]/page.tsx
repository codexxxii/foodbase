import { getCategory } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  await auth.protect();

  const { category } = await params;

  const recipes = await getCategory(category);

  return (
    <div>
      <div className="w-full h-24 border-b border-b-gray-200 px-5 flex justify-start items-center">
        <p className="text-5xl font-semibold tracking-tighter capitalize">
          {category}
        </p>
      </div>
      <div className="w-full">
        {recipes.length < 1 ? (
          <div className="w-full h-44 grid place-items-center">
            <p className="text-sm text-gray-400">No recipes</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 place-items-start gap-px">
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
      </div>
    </div>
  );
}

async function Recipes({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const recipes = await getCategory(category);

  return (
    <div className="w-full">
      {recipes.length < 1 ? (
        <div className="w-full h-44 grid place-items-center">
          <p className="text-sm text-gray-400">No recipes</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 place-items-start gap-px">
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
    </div>
  );
}
