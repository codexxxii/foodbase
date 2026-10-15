import { auth } from "@clerk/nextjs/server";

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
      <div className="w-full min-h-55 border-b border-b-gray-200"></div>
      <div className="w-full h-14 px-5 flex justify-start items-center border-b border-b-gray-200">
        <p className="text-2xl font-black tracking-tighter">
          Recipes that include: {query}
        </p>
      </div>
      <div className="w-full min-h-55 border-b border-b-gray-200"></div>
    </div>
  );
}
