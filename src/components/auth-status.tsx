import { Show, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function AuthStatus() {
  return (
    <div className="flex items-center gap-2.5">
      <Show when={"signed-out"}>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-black text-white flex items-center gap-1">
            Get Started <ArrowRightIcon size={12} />
          </button>
        </SignUpButton>
      </Show>
      <Show when={"signed-in"}>
        <Link href={"/"}>
          <button className="border-transparent! hover:underline">Home</button>
        </Link>
        <Link href={"/recipes"}>
          <button className="border-transparent! hover:underline">
            Recipes
          </button>
        </Link>
        <Link href={"/favorites"}>
          <button className="border-transparent! hover:underline">
            Favorites
          </button>
        </Link>
        <Link href={"/create"}>
          <button className="border-transparent! hover:underline">
            Create
          </button>
        </Link>
        <SignOutButton>
          <button className="border-red-500! text-red-500 bg-red-100">
            Sign Out
          </button>
        </SignOutButton>
      </Show>
    </div>
  );
}
