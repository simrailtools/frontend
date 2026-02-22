import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { findPointByIdOptions, findServerByIdOptions } from "@/api/rest/@tanstack/react-query.gen.ts";
import { BackgroundImage } from "@/components/BackgroundImage.tsx";
import { BoardEntryTable } from "@/routes/departureboard/-components/BoardEntryTable.tsx";
import { BoardHeader } from "@/routes/departureboard/-components/BoardHeader.tsx";
import { BoardSelectForm } from "@/routes/departureboard/-components/BoardSelectForm.tsx";

export const Route = createFileRoute("/departureboard/")({
  validateSearch: z.object({
    serverId: z.uuid({ version: "v5" }).optional().catch(undefined),
    pointId: z.uuidv4().optional().catch(undefined),
    onlyPassengerTrains: z.boolean().catch(false),
    timeSpan: z.number().gte(15).lte(180).catch(60),
    sortOrder: z.enum(["schedule", "realtime"]).catch("realtime"),
  }),
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

  return (
    <BackgroundImage>
      <BoardSelectForm {...searchParameters} />
    </BackgroundImage>
  );
}
