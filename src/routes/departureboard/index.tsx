import { findPointByIdOptions, findServerByIdOptions } from "@/api/generated/@tanstack/react-query.gen.ts";
import { BoardEntryTable } from "@/routes/departureboard/-components/BoardEntryTable.tsx";
import { BoardHeader } from "@/routes/departureboard/-components/BoardHeader.tsx";
import { BoardSelectForm } from "@/routes/departureboard/-components/BoardSelectForm.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

/**
 * Validator for search (query) parameters of this route, point and server
 * id are optional to display a form to fill to make board finding easier.
 */
const boardSearchSchema = z.object({
  serverId: z.string().uuid().optional(),
  pointId: z.string().uuid().optional(),
  onlyPassengerTrains: z.boolean().catch(false),
  timeSpan: z.number().gte(15).lte(180).catch(60),
  sortOrder: z.enum(["schedule", "realtime"]).catch("realtime"),
});

export const Route = createFileRoute("/departureboard/")({
  validateSearch: zodValidator(boardSearchSchema),
  loaderDeps: ({ search: { serverId, pointId } }) => ({ serverId, pointId }),
  loader: async ({ context: { queryClient }, deps: { serverId, pointId } }) => {
    if (serverId && pointId) {
      const server = await queryClient.ensureQueryData(findServerByIdOptions({ path: { id: serverId } }));
      if (!server) {
        throw new Error("The server of the requested board does not exist");
      }

      const point = await queryClient.ensureQueryData(findPointByIdOptions({ path: { id: pointId } }));
      if (!point) {
        throw new Error("The requested point does not exist");
      }

      return { server, point };
    }
  },
  component: BoardComponent,
});

function BoardComponent() {
  const loaderData = Route.useLoaderData();
  const searchParameters = Route.useSearch();
  if (loaderData) {
    return (
      <>
        <BoardHeader {...loaderData} />
        <BoardEntryTable {...loaderData} {...searchParameters} />
      </>
    );
  }

  return <BoardSelectForm {...searchParameters} />;
}
