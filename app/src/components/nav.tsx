import { Link } from "@tanstack/react-router";
import MaxWidthWrapper from "./max-width-wrapper";
import { Show, SignInButton, SignUpButton, SignOutButton } from "@clerk/react";
import { ArrowRightIcon } from "lucide-react";

export default function Nav() {
  return (
    <header className="w-full h-15 border-b border-gray-200">
      <MaxWidthWrapper className="border-x border-x-gray-200 px-5 flex justify-between items-center h-full">
        <Link to="/" className="text-3xl font-black tracking-tighter">
          Foodbase
        </Link>
        <nav className="flex items-center gap-2.5">
          <Link to="/">
            <button className="border-transparent hover:underline">Home</button>
          </Link>
          <Show when={"signed-in"}>
            <Link to="/recipes">
              <button className="border-transparent hover:underline">
                Recipes
              </button>
            </Link>
            <Link to="/favorites">
              <button className="border-transparent hover:underline">
                Favorites
              </button>
            </Link>
            <Link to="/create-recipe">
              <button className="border-transparent hover:underline">
                Create Recipe
              </button>
            </Link>
            <SignOutButton>
              <button className="border-red-400 bg-red-50 text-red-400">
                Sign Out
              </button>
            </SignOutButton>
          </Show>
          <Show when={"signed-out"}>
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex items-center gap-2 border-black bg-black text-white">
                Get Started <ArrowRightIcon size={12} />
              </button>
            </SignUpButton>
          </Show>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
