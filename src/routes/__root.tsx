import { ErrorDisplay } from "@/components/ErrorDisplay.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  notFoundComponent: () => <ErrorDisplay errorMessage={"The requested page does not exist"} />,
});
