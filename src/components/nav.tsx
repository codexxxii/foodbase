import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Suspense } from "react";
import { Show, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { links } from "@/lib/constants";

export default function Nav() {
  return (
    <header className="w-full h-15 border-b border-b-gray-200">
      <MaxWidthWrapper className="h-full flex justify-between items-center px-5 border-x border-x-gray-200">
        <Link href="/" className="text-3xl font-semibold tracking-tighter">
          Foodbase
        </Link>
        <nav className="flex items-center gap-5">
          <Suspense>
            <Show when={"signed-out"}>
              <SignInButton mode="modal">
                <button>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex items-center gap-2 border-black bg-black text-white">
                  Get Started <ArrowRight size={12} />
                </button>
              </SignUpButton>
            </Show>
            <Show when={"signed-in"}>
              {links.map((link) => (
                <Link href={{ pathname: link.href }} key={link.id}>
                  <button className="border-transparent hover:underline">
                    {link.label}
                  </button>
                </Link>
              ))}
              <SignOutButton>
                <button className="border-red-400 bg-red-50 text-red-400 text">
                  Sign Out
                </button>
              </SignOutButton>
            </Show>
          </Suspense>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
