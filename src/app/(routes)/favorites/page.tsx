import { auth } from "@clerk/nextjs/server";

export default async function FavoritesPage() {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return <div>Favorites Page</div>;
}
