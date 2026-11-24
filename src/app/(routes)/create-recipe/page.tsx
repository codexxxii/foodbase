import RecipeForm from "@/components/recipe-form";
import { auth } from "@clerk/nextjs/server";

export default async function CreateRecipePage() {
  await auth.protect();

  return <RecipeForm />;
}
