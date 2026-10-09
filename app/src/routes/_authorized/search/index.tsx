import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorized/search/")({
  validateSearch: (search: Record<string, unknown>) => ({
    query: typeof search.query === "string" ? search.query : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { query } = Route.useSearch();

  return <div>{query}</div>;
}
