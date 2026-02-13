import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { type FC, useEffect, useState } from "react";
import type { SimRailServerDto } from "@/api/rest";
import { listServersOptions } from "@/api/rest/@tanstack/react-query.gen.ts";
import { BackgroundImage } from "@/components/BackgroundImage.tsx";
import { cn } from "@/lib/utils.ts";
import { ServerMapText } from "@/routes/map/-components/ServerMapText.tsx";

export const Route = createFileRoute("/map/")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(listServersOptions({ query: { includeOffline: true } }));
  },
  component: MapIndexComponent,
});

/**
 * Function to resolve the current date and time on a server.
 * @param server the server to resolve the time of.
 */
const resolveServerTime = (server: SimRailServerDto) => {
  return DateTime.utc().plus({ hours: server.utcOffsetHours });
};

function MapIndexComponent() {
  const { data } = useQuery({
    ...listServersOptions({ query: { includeOffline: true } }),
    refetchInterval: 30_000,
  });
  return (
    <BackgroundImage>
      <div className={"flex flex-col justify-center items-center min-h-dvh"}>
        {data
          ?.sort((left, right) => left.code.localeCompare(right.code, "en"))
          .map(server => (
            <ServerItem key={server.id} server={server} />
          ))}
      </div>
    </BackgroundImage>
  );
}

const ServerItem: FC<{ server: SimRailServerDto }> = ({ server }) => {
  const [serverTime, setServerTime] = useState(() => resolveServerTime(server));
  useEffect(() => {
    const interval = setInterval(() => setServerTime(resolveServerTime(server)), 1000);
    return () => clearInterval(interval);
  }, [server]);

  // format the date and time on the server, removes the ':' from the time to create an optical "time is updating" effect
  const isEvenTime = serverTime.second % 2 === 0;
  const targetDateTimeFormat = isEvenTime ? "dd.MM.yy HH:mm" : "dd.MM.yy HH\u2008mm";
  const formattedServerTime = serverTime.toFormat(targetDateTimeFormat);

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
        {server.spokenLanguage != null && <div className={"ml-2"}>({server.spokenLanguage})</div>}
        <span className={"ml-auto text-sm font-semibold"}>{formattedServerTime}</span>
      </div>
      <ServerMapText scenery={server.scenery} />
      {server.tags.length > 0 && <span className={"text-gray-600 text-sm"}>{server.tags.join(", ")}</span>}
    </Link>
  );
};
