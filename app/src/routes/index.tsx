import SearchBar from "@/components/search-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center">
      <h3 className="text-7xl font-black text-center tracking-tighter mb-2.5">
        Welcome to Foodbase!
      </h3>
      <p className="text-sm text-gray-400 text-center w-full max-w-lg mb-5">
        Create your personal cookbook with the recipes you enjoy the most.
        Create, organize, favorite your recipes and start cooking right way.
      </p>
      <SearchBar />
    </div>
  );
}
