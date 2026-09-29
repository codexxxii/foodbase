import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/create-recipe/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="w-full h-15 flex justify-between items-center px-5 border-b border-b-gray-200">
        <p className="text-2xl font-black tracking-tighter">Create recipe</p>
        <button>Save</button>
      </div>
      <div className="w-full h-32 border-b border-b-gray-200 px-5">
        <input
          type="text"
          placeholder="Name"
          className="w-full h-full outline-none text-5xl tracking-tighter font-black"
        />
      </div>
      <div className="w-full h-100 border-b border-b-gray-200 flex">
        <div className="w-1/2 h-full border-r border-gray-200"></div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
}
