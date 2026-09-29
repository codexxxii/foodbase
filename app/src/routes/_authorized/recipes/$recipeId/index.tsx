import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/recipes/$recipeId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>recipe id</div>;
}
