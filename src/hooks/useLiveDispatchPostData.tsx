import { create, fromBinary } from "@bufbuild/protobuf";
import { useCallback } from "react";
import {
  type DispatchPostRemoveFrame,
  DispatchPostRemoveFrameSchema,
  type DispatchPostUpdateFrame,
  DispatchPostUpdateFrameSchema,
  UserPlatform,
} from "@/api/proto/event_bus_pb.ts";
import { findDispatchPostById, findDispatchPosts, type GeoPositionDto } from "@/api/rest";
import { useNatsSyncedList } from "@/hooks/useNatsSyncedList.tsx";

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
    (frame: DispatchPostUpdateFrame): [string, bigint] => [frame.ids?.dataId ?? "", frame.baseData?.timestamp ?? 0n],
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
        const liveData = create(DispatchPostUpdateFrameSchema, {
          baseData: {
            timestamp: -1n,
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
  const baseDataLoader = useCallback(async (id: string): Promise<DispatchPostBaseData> => {
    const post = await findDispatchPostById({ throwOnError: true, path: { id } });
    return {
      name: post.name,
      pointId: post.pointId,
      position: post.position,
      images: post.images,
      difficulty: post.difficulty,
    };
  }, []);

  const updateFrameDecoder = useCallback((data: Uint8Array) => fromBinary(DispatchPostUpdateFrameSchema, data), []);
  const removeFrameDecoder = useCallback((data: Uint8Array) => fromBinary(DispatchPostRemoveFrameSchema, data), []);

  return useNatsSyncedList<DispatchPostBaseData, DispatchPostUpdateFrame, DispatchPostRemoveFrame>({
    key: "dispatch_posts",
    updateTopic: `sit-events.dispatch-post-updates.v1.${serverId}.${postId ?? "*"}`,
    removeTopic: `sit-events.dispatch-post-removals.v1.${serverId}.${postId ?? "*"}`,
    updateFrameDecoder,
    removeFrameDecoder,
    removeIdExtractor,
    updateDataExtractor,
    snapshotLoader,
    baseDataLoader,
  });
};
