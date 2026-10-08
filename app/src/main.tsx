import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/react";
import "@/styles/globals.css";

export const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ClerkProvider>
    </StrictMode>,
  );
}
