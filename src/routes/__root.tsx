import { ErrorDisplay } from "@/components/ErrorDisplay.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
  notFoundComponent: () => <ErrorDisplay errorMessage={"The requested page does not exist"} />,
});

/**
 * Component for the TanStack router devtools, only displayed in dev.
 */
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(async () => {
      const res = await import("@tanstack/react-router-devtools");
      return {
        default: res.TanStackRouterDevtools,
      };
    });

/**
 * Component for the TanStack query devtools, only displayed in dev.
 */
const TanStackQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(async () => {
      const res = await import("@tanstack/react-query-devtools");
      return {
        default: res.ReactQueryDevtools,
      };
    });

function Root() {
  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools position={"bottom-left"} />
        <TanStackQueryDevtools buttonPosition={"bottom-right"} />
      </Suspense>
    </>
  );
}
