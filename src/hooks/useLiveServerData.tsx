import { create, fromBinary } from "@bufbuild/protobuf";
import { useCallback } from "react";
import {
  type ServerRemoveFrame,
  ServerRemoveFrameSchema,
  type ServerUpdateFrame,
  ServerUpdateFrameSchema,
} from "@/api/proto/event_bus_pb.ts";
import { findServerById, listServers, type SimRailServerDto } from "@/api/rest";
import { useNatsSyncedList } from "@/hooks/useNatsSyncedList.tsx";

export type ServerBaseData = {
  code: string;
  region: SimRailServerDto["region"];
};

export const useLiveServerData = (serverId?: string) => {
  const removeIdExtractor = useCallback((frame: ServerRemoveFrame) => frame.serverId, []);
  const updateDataExtractor = useCallback(
    (frame: ServerUpdateFrame): [string, bigint] => [frame.ids?.dataId ?? "", frame.baseData?.timestamp ?? 0n],
    [],
  );

  const snapshotLoader = useCallback(async (): Promise<[ServerBaseData, ServerUpdateFrame][]> => {
    const servers = await listServers({ query: { includeOffline: true } });
    return (servers ?? [])
      .filter(server => !serverId || server.id === serverId)
      .map(server => {
        const baseData: ServerBaseData = {
          code: server.code,
          region: server.region,
        };
        const liveData = create(ServerUpdateFrameSchema, {
          baseData: {
            timestamp: -1n,
          },
          ids: {
            dataId: server.id,
            serverId: server.id,
            foreignId: "",
          },
          serverData: {
            tags: server.tags,
            online: server.online,
            scenery: server.scenery,
            spokenLanguage: server.spokenLanguage ?? undefined,
            utcOffsetSeconds: BigInt(server.utcOffsetHours * 3600),
          },
        });

        return [baseData, liveData];
      });
  }, [serverId]);
  const baseDataLoader = useCallback(async (id: string): Promise<ServerBaseData> => {
    const server = await findServerById({ throwOnError: true, path: { id } });
    return {
      code: server.code,
      region: server.region,
    };
  }, []);

  const updateFrameDecoder = useCallback((data: Uint8Array) => fromBinary(ServerUpdateFrameSchema, data), []);
  const removeFrameDecoder = useCallback((data: Uint8Array) => fromBinary(ServerRemoveFrameSchema, data), []);

  return useNatsSyncedList<ServerBaseData, ServerUpdateFrame, ServerRemoveFrame>({
    key: "servers",
    updateTopic: `sit-events.server-updates.v1.${serverId ?? "*"}`,
    removeTopic: `sit-events.server-removals.v1.${serverId ?? "*"}`,
    updateFrameDecoder,
    removeFrameDecoder,
    removeIdExtractor,
    updateDataExtractor,
    snapshotLoader,
    baseDataLoader,
  });
};
