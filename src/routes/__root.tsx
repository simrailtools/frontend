import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { PacerDevtoolsPanel } from "@tanstack/react-pacer-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ErrorDisplay } from "@/components/ErrorDisplay.tsx";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: Root,
  notFoundComponent: () => <ErrorDisplay errorMessage={"The requested page does not exist"} />,
});

function Root() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          theme: "dark",
          position: "bottom-left",
        }}
        plugins={[
          { name: "TanStack Form", render: <FormDevtoolsPanel /> },
          { name: "TanStack Pacer", render: <PacerDevtoolsPanel /> },
          { name: "TanStack Query", render: <ReactQueryDevtoolsPanel /> },
          { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> },
        ]}
      />
    </>
  );
}
