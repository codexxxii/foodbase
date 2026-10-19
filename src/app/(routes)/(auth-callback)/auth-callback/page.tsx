import AuthCallback from "@/components/auth-callback";
import { auth } from "@clerk/nextjs/server";

export default async function AuthenticatingPage() {
  const { isAuthenticated, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  return <AuthCallback />;
}
