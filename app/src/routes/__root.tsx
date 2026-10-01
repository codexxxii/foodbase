import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

type RootContext = {
  queryClient: QueryClient;
};

const RootLayout = () => (
  <>
    <Nav />
    <MaxWidthWrapper className="min-h-[calc(100vh-60px)] border-x border-x-gray-200">
      <Outlet />
    </MaxWidthWrapper>
    <Toaster />
  </>
);

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
