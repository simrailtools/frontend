import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import Long from "long";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorDisplay } from "@/components/ErrorDisplay.tsx";
import { Throbber } from "@/components/Throbber.tsx";
import "./index.css";
import protobuf from "protobufjs";
import { routeTree } from "./routeTree.gen.ts";

/**
 * The query client used in the application.
 */
const queryClient = new QueryClient();

/**
 * The application router.
 */
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: Throbber,
  defaultErrorComponent: ({ error }) => <ErrorDisplay errorMessage={error.message} />,
});

/**
 * Setups the type safety for everything related to routing across the whole project.
 * See https://tanstack.com/router/latest/docs/framework/react/guide/creating-a-router#router-type-safety
 */
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// configure the protobuf library
protobuf.util.Long = Long;
protobuf.configure();

// biome-ignore lint/style/noNonNullAssertion: root element is present, trust me
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
