import RecipeForm from "@/components/recipe-form";
import { auth } from "@clerk/nextjs/server";

export default async function CreatePage() {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return <RecipeForm />;
}
