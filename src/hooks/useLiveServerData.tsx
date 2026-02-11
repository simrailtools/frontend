import Long from "long";
import { useCallback } from "react";
import { tools } from "@/api/proto/bundle";
import { findServerById, listServers, type SimRailServerDto } from "@/api/rest";
import { useNatsSyncedList } from "@/hooks/useNatsSyncedList.tsx";

import ServerUpdateFrame = tools.simrail.backend.ServerUpdateFrame;
import ServerRemoveFrame = tools.simrail.backend.ServerRemoveFrame;

export type ServerBaseData = {
  code: string;
  region: SimRailServerDto["region"];
};

export const useLiveServerData = (serverId?: string) => {
  const removeIdExtractor = useCallback((frame: ServerRemoveFrame) => frame.serverId, []);
  const updateDataExtractor = useCallback(
    (frame: ServerUpdateFrame): [string, Long] => [frame.ids.dataId, frame.baseData.timestamp],
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
        const liveData = new ServerUpdateFrame({
          baseData: {
            timestamp: Long.MIN_VALUE,
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
            spokenLanguage: server.spokenLanguage,
            utcOffsetSeconds: Long.fromNumber(server.utcOffsetHours).mul(3600),
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

  return useNatsSyncedList<ServerBaseData, ServerUpdateFrame, ServerRemoveFrame>({
    updateTopic: `sit-events.server-updates.v1.${serverId ?? "*"}`,
    removeTopic: `sit-events.server-removals.v1.${serverId ?? "*"}`,
    updateFrameDecoder: ServerUpdateFrame,
    removeFrameDecoder: ServerRemoveFrame,
    removeIdExtractor,
    updateDataExtractor,
    snapshotLoader,
    baseDataLoader,
  });
};
