import { categories } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  await auth.protect();

  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center px-5">
        <p className="text-5xl font-semibold tracking-tighter">Categories</p>
      </div>
      <div className="w-full grid grid-cols-4 gap-px place-items-start">
        {categories.map((category) => (
          <Link
            href={{ pathname: `/categories/${category.value}` }}
            key={category.id}
            className="w-full h-50 relative group"
          >
            <Image
              src={category.image_url}
              alt={category.label}
              fill
              className="object-cover grayscale transition-all ease-in-out duration-500 group-hover:grayscale-0"
            />
            <div className="w-full h-full flex bg-linear-to-b from-transparent to-black justify-start items-end p-3 absolute grayscale transition-all ease-in-out duration-500 group-hover:opacity-0">
              <p className="text-lg text-white font-semibold">
                {category.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
