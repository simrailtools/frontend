import { listServersQueryOptions } from "@/api/clients/serversClient.ts";
import type { ListServersRequestOptions, SitServer } from "@/api/types/servers.types.ts";
import { BackgroundImage } from "@/components/BackgroundImage.tsx";
import { cn } from "@/lib/utils.ts";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

/**
 *
 */
const listServersRequest: ListServersRequestOptions = {
  includeOffline: true,
};

export const Route = createFileRoute("/map/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(listServersQueryOptions(listServersRequest));
  },
  component: MapIndexComponent,
});

function MapIndexComponent() {
  const { data } = useQuery({
    ...listServersQueryOptions(listServersRequest),
    refetchInterval: 30_000,
  });
  return (
    <BackgroundImage>
      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        {data
          ?.sort((left, right) => left.code.localeCompare(right.code, "en"))
          .map(server => (
            <ServerItem key={server.id} server={server} />
          ))}
      </div>
    </BackgroundImage>
  );
}

const ServerItem: FC<{ server: SitServer }> = ({ server }) => {
  return (
    <Link
      to={"/map/$serverId"}
      params={{ serverId: server.code }}
      className={"flex flex-col bg-gray-100 border-2 border-gray-600 rounded-xl p-3 m-2"}
    >
      <div className={"flex flex-row w-96 items-center"}>
        <span className={"relative flex h-3 w-3"}>
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              server.online && "bg-green-400",
              !server.online && "bg-red-400",
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-3 w-3",
              server.online && "bg-green-500",
              !server.online && "bg-red-500",
            )}
          />
        </span>
        <div className={"ml-2 font-bold"}>{server.code}</div>
        {server.spokenLanguage && <div className={"ml-2"}>({server.spokenLanguage})</div>}
        <span className={"ml-auto text-sm font-semibold"}>
          {server.timezoneId === "Z" ? "UTC" : `UTC${server.timezoneId}`}
        </span>
      </div>
      {server.tags && <span className={"text-gray-600 text-sm"}>{server.tags.join(", ")}</span>}
    </Link>
  );
};
