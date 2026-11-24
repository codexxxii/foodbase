import SearchBar from "@/components/search-bar";
import { Show } from "@clerk/nextjs";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center space-y-5">
      <Suspense>
        <Show when={"signed-in"}>
          <div className="space-y-2.5">
            <p className="text-7xl font-semibold tracking-tighter text-center">
              What are you craving?
            </p>
            <p className="text-gray-400 text-center">
              Find the perfect recipe for whatever you're in the mood for.
            </p>
          </div>
          <SearchBar />
        </Show>
        <Show when={"signed-out"}>
          <p className="text-7xl font-semibold tracking-tighter text-center w-full">
            A little inspiration for every meal
          </p>
          <p className="text-gray-400 text-center">
            Rediscover your favorites or try something new. Sign in or sign up
            to get started.
          </p>
        </Show>
      </Suspense>
    </div>
  );
}
