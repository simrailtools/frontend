import type { JourneyEventDto } from "@/api/generated";
import {
  findJourneyByIdOptions,
  findServerByIdOptions,
  findVehicleCompositionByJourneyIdOptions,
} from "@/api/generated/@tanstack/react-query.gen.ts";
import { JourneyBaseInfo } from "@/routes/journeys/-components/JourneyBaseInfo.tsx";
import { JourneyStopItem } from "@/routes/journeys/-components/JourneyStopItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";

export const Route = createFileRoute("/journeys/$journeyId")({
  loader: async ({ context: { queryClient }, params: { journeyId } }) => {
    const journey = await queryClient.ensureQueryData(findJourneyByIdOptions({ path: { id: journeyId } }));
    if (!journey) {
      throw new Error("The requested journey does not exist");
    }

    const server = await queryClient.ensureQueryData(findServerByIdOptions({ path: { id: journey.serverId } }));
    if (!server) {
      throw new Error("The server the journey runs on does not exist");
    }

    return { journey, server };
  },
  component: JourneyDetailsComponent,
});

function JourneyDetailsComponent() {
  const { journeyId } = Route.useParams();
  const { server } = Route.useLoaderData();
  const { data: journey } = useQuery({
    ...findJourneyByIdOptions({ path: { id: journeyId } }),
    refetchInterval: query => {
      return query.state.data?.lastSeenTime ? false : 30_000;
    },
  });
  const { data: vehicleComposition } = useQuery({
    ...findVehicleCompositionByJourneyIdOptions({ path: { id: journeyId } }),
    enabled: query => {
      if (query.state.data) {
        return !!journey?.firstSeenTime && query.state.data.status !== "REAL";
      }

      // allow initial fetch of data
      return true;
    },
  });

  // should usually not happen, but could potentially happen on a re-fetch
  if (!journey) {
    throw new Error("The requested journey no longer exists");
  }

  // map the events along the journey route into [arrival, departure] event pairs
  const firstEvent = journey.events[0];
  const stops = journey.events.reduce(
    (acc, event) => {
      if (event.type === "ARRIVAL") {
        // if the current event is an arrival start a new arrival departure pair in the accumulating array
        acc.push([event, undefined]);
      } else {
        const prevEntry = acc[acc.length - 1];
        if (prevEntry) {
          // if a previous arrival event was found set the departure event of the pair
          prevEntry[1] = event;
        } else {
          // if no previous arrival event was found just add a new pair without an arrival event,
          // this case should usually only happen for the first event along the journey route
          acc.push([undefined, event]);
        }
      }

      return acc;
    },
    [] as Array<[JourneyEventDto | undefined, JourneyEventDto | undefined]>,
  );

  // formats the given iso date/time in the server timezone using the optionally provided format
  const timeFormatter = (isoTime: string, format?: string) => {
    const serverTz = server.timezoneId === "Z" ? "utc" : server.timezoneId;
    const givenDt = DateTime.fromISO(isoTime);
    const dtZoned = givenDt.setZone(serverTz);
    const dt = dtZoned.isValid ? dtZoned : givenDt;
    return dt.toFormat(format ?? "dd.MM HH:mm");
  };

  return (
    <>
      <title>{`${firstEvent.transport.category} ${firstEvent.transport.number} - SIT`}</title>
      <div className="bg-gray-100 p-2 min-h-dvh w-full">
        <div className={"hidden lg:block"}>
          <JourneyBaseInfo journey={journey} composition={vehicleComposition} timeFormatter={timeFormatter} />
          <div className={"flex items-center p-4"}>
            <div className="flex-grow border-t border-gray-400" />
          </div>
        </div>
        <div className="space-y-10">
          {stops.map(([arrival, departure], index) => (
            <JourneyStopItem
              key={arrival?.id || departure?.id || index}
              arrival={arrival}
              departure={departure}
              timeFormatter={timeFormatter}
            />
          ))}
        </div>
      </div>
    </>
  );
}
