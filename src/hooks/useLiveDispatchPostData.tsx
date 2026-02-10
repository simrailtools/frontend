import Long from "long";
import { useCallback } from "react";
import { tools } from "@/api/proto/bundle";
import { findDispatchPostById, findDispatchPosts, type GeoPositionDto } from "@/api/rest";
import { useNatsSyncedList } from "@/hooks/useNatsSyncedList.tsx";

import DispatchPostRemoveFrame = tools.simrail.backend.DispatchPostRemoveFrame;
import DispatchPostUpdateFrame = tools.simrail.backend.DispatchPostUpdateFrame;
import UserPlatform = tools.simrail.backend.UserPlatform;

export type DispatchPostBaseData = {
  name: string;
  pointId: string;
  position: GeoPositionDto;
  images: Array<string>;
  difficulty: number;
};

export const useLiveDispatchPostData = (serverId: string, postId?: string) => {
  const removeIdExtractor = useCallback((frame: DispatchPostRemoveFrame) => frame.postId, []);
  const updateDataExtractor = useCallback(
    (frame: DispatchPostUpdateFrame): [string, Long] => [frame.ids.dataId, frame.baseData.timestamp],
    [],
  );
  const snapshotLoader = useCallback(async (): Promise<[DispatchPostBaseData, DispatchPostUpdateFrame][]> => {
    const dispatchPosts = await findDispatchPosts({ query: { serverId, limit: 250 } });
    return (dispatchPosts?.items ?? [])
      .filter(post => !postId || post.id === postId)
      .map(post => {
        const baseData: DispatchPostBaseData = {
          name: post.name,
          pointId: post.pointId,
          position: post.position,
          images: post.images,
          difficulty: post.difficulty,
        };
        const liveData = new DispatchPostUpdateFrame({
          baseData: {
            timestamp: Long.MIN_VALUE,
          },
          ids: {
            dataId: post.id,
            serverId: post.serverId,
            foreignId: "",
          },
          dispatchPostData: {
            dispatcher: post.realtimeData.dispatcher && {
              id: post.realtimeData.dispatcher.id,
              platform: UserPlatform[post.realtimeData.dispatcher.platform],
            },
          },
        });

        return [baseData, liveData];
      });
  }, [serverId, postId]);
  const baseDataLoader = useCallback(async (id: string): Promise<DispatchPostBaseData | undefined> => {
    const post = await findDispatchPostById({ path: { id } });
    if (!post) {
      return undefined;
    }

    return {
      name: post.name,
      pointId: post.pointId,
      position: post.position,
      images: post.images,
      difficulty: post.difficulty,
    };
  }, []);

  return useNatsSyncedList<DispatchPostBaseData, DispatchPostUpdateFrame, DispatchPostRemoveFrame>({
    updateTopic: `sit-events.dispatch-post-updates.v1.${serverId}.${postId ?? "*"}`,
    removeTopic: `sit-events.dispatch-post-removals.v1.${serverId}.${postId ?? "*"}`,
    updateFrameDecoder: DispatchPostUpdateFrame,
    removeFrameDecoder: DispatchPostRemoveFrame,
    removeIdExtractor,
    updateDataExtractor,
    snapshotLoader,
    baseDataLoader,
  });
};
