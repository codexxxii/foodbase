import { getFavorites } from "@/server/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function FavoritesPage() {
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center px-5 border-b border-b-gray-200">
        <p className="text-5xl font-semibold tracking-tighter">Favorites</p>
      </div>
      <Suspense fallback={<Fallback />}>
        <Favorites />
      </Suspense>
    </div>
  );
}

function Fallback() {
  return (
    <div className="w-full grid grid-cols-5 place-items-start gap-px">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="w-full h-50 bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}

async function Favorites() {
  await auth.protect();

  const favorites = await getFavorites();

  return (
    <div className="w-full">
      {favorites.length < 1 ? (
        <div className="w-full h-44 grid place-items-center">
          <p className="text-sm text-gray-400">No recipes</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 place-items-start gap-px">
          {favorites.map(({ recipe }, index) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={index}
              className="w-full h-50 relative group"
            >
              <Image
                src={recipe.image_url}
                alt={recipe.name}
                fill
                className="object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
              />
              <div className="absolute w-full h-full flex justify-start items-end p-3 transition-all ease-in-out duration-500 group-hover:opacity-0">
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
