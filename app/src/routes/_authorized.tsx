import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { getCurrentUser } from "@/lib/api";

export const Route = createFileRoute("/_authorized")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.query({
      queryKey: ["current-user"],
      queryFn: getCurrentUser,
      staleTime: Infinity,
    });

    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = Route.useRouteContext();

  if (!user.userData) {
    return Navigate({ to: "/" });
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
