import Long from "long";
import { useCallback } from "react";
import { tools } from "@/api/proto/bundle";
import { findJourneyById, type JourneyTransportSummaryDto, listActiveJourneys } from "@/api/rest";
import { useNatsSyncedList } from "@/hooks/useNatsSyncedList";

import JourneyRemoveFrame = tools.simrail.backend.JourneyRemoveFrame;
import JourneyUpdateFrame = tools.simrail.backend.JourneyUpdateFrame;
import UserPlatform = tools.simrail.backend.UserPlatform;

/**
 * Terminal stop place data of a journey.
 */
export type JourneyTerminalStopPlace = {
  id: string;
  name: string;
};

/**
 * Base data of a journey.
 */
export type JourneyBaseData = {
  origin: JourneyTerminalStopPlace;
  destination: JourneyTerminalStopPlace;
  transport: JourneyTransportSummaryDto;
};

export const useLiveJourneyData = (serverId: string, journeyId?: string) => {
  const removeIdExtractor = useCallback((frame: JourneyRemoveFrame) => frame.journeyId, []);
  const updateDataExtractor = useCallback(
    (frame: JourneyUpdateFrame): [string, Long] => [frame.ids.dataId, frame.baseData.timestamp],
    [],
  );
  const snapshotLoader = useCallback(async (): Promise<[JourneyBaseData, JourneyUpdateFrame][]> => {
    const journeys = await listActiveJourneys({ query: { serverId } });
    return (journeys ?? [])
      .filter(journey => !journeyId || journey.journeyId === journeyId)
      .map(journey => {
        const baseData: JourneyBaseData = {
          origin: {
            id: journey.originEvent.stopPlace.id,
            name: journey.originEvent.stopPlace.name,
          },
          destination: {
            id: journey.destinationEvent.stopPlace.id,
            name: journey.destinationEvent.stopPlace.name,
          },
          transport: journey.originEvent.transport,
        };
        const liveData = new JourneyUpdateFrame({
          baseData: {
            timestamp: Long.MIN_VALUE,
          },
          ids: {
            dataId: journey.journeyId,
            serverId: journey.serverId,
            foreignId: "",
          },
          journeyData: {
            speed: journey.liveData.speed,
            position: {
              latitude: journey.liveData.position.latitude,
              longitude: journey.liveData.position.longitude,
            },
            driver: journey.liveData.driver && {
              id: journey.liveData.driver.id,
              platform: UserPlatform[journey.liveData.driver.platform],
            },
            nextSignal: journey.liveData.nextSignal && {
              name: journey.liveData.nextSignal.id,
              maxSpeedKmh: journey.liveData.nextSignal.maxSpeed,
              distanceMeters: journey.liveData.nextSignal.distance,
            },
            currentPointId: undefined,
          },
        });

        return [baseData, liveData];
      });
  }, [journeyId, serverId]);
  const baseDataLoader = useCallback(async (id: string): Promise<JourneyBaseData> => {
    const journey = await findJourneyById({ throwOnError: true, path: { id } });
    const events = journey.events;
    return {
      origin: {
        id: events[0].stopPlace.id,
        name: events[0].stopPlace.name,
      },
      destination: {
        id: events[events.length - 1].stopPlace.id,
        name: events[events.length - 1].stopPlace.id,
      },
      transport: events[0].transport,
    };
  }, []);

  return useNatsSyncedList<JourneyBaseData, JourneyUpdateFrame, JourneyRemoveFrame>({
    key: "journeys",
    updateTopic: `sit-events.journey-updates.v1.${serverId}.${journeyId ?? "*"}`,
    removeTopic: `sit-events.journey-removals.v1.${serverId}.${journeyId ?? "*"}`,
    updateFrameDecoder: JourneyUpdateFrame,
    removeFrameDecoder: JourneyRemoveFrame,
    removeIdExtractor,
    updateDataExtractor,
    snapshotLoader,
    baseDataLoader,
  });
};
