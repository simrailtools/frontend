import type { JourneyDto, JourneyEventDto, VehicleCompositionDto } from "@/api/generated";
import { Heading } from "@/components/Heading.tsx";
import type { FC, PropsWithChildren } from "react";

type JourneyBaseInfoProps = {
  journey: JourneyDto;
  composition?: VehicleCompositionDto | null;
  timeFormatter: (isoTime: string) => string;
};

const findLastPlayableEvent = (events: Array<JourneyEventDto>) => {
  for (let index = events.length - 1; index >= 0; index--) {
    const event = events[index];
    if (event.stopPlace.inPlayableBorder) {
      return event;
    }
  }
};

const InfoText: FC<{ heading: string } & PropsWithChildren> = ({ heading, children }) => {
  return (
    <div>
      <Heading level={2}>{heading}</Heading>
      {children}
    </div>
  );
};

const InfoLine: FC<{ display?: string } & PropsWithChildren> = ({ display, children }) => {
  return (
    <div className={"flex flex-row space-x-1"}>
      {display && <p className={"font-semibold"}>{display}:</p>}
      {children}
    </div>
  );
};

export const JourneyBaseInfo: FC<JourneyBaseInfoProps> = ({ journey, composition, timeFormatter }) => {
  // first and last event of journey
  const firstEvent = journey.events[0];
  const lastEvent = journey.events[journey.events.length - 1];

  // first and last event of journey in playable border
  const firstPlayableEvent = journey.events.find(event => event.stopPlace.inPlayableBorder);
  const lastPlayableEvent = findLastPlayableEvent(journey.events);

  // find the maximum speed of the train long the events
  const vMax = Math.max(...journey.events.map(event => event.transport.maxSpeed));

  //
  const tractionUnit = composition?.vehicles.at(0);
  const compositionWeight = composition?.vehicles
    .map(vehicle => {
      const loadWeight = vehicle.loadWeight ?? 0;
      return vehicle.railcar.weight + loadWeight;
    })
    .reduce((partial, element) => partial + element, 0);
  const compositionLength = composition?.vehicles
    .map(vehicle => vehicle.railcar.length)
    .reduce((partial, element) => partial + element, 0);

  return (
    <div className="grid gap-1 grid-cols-2 pt-4 px-4">
      <InfoText heading={"Train Info"}>
        {/* Train Category, Number, Line, Label */}
        <div className={"flex flex-row space-x-1 text-lg"}>
          <p>
            {firstEvent.transport.category} {firstEvent.transport.number}
          </p>
          {firstEvent.transport.line && <p>({firstEvent.transport.line})</p>}
          {firstEvent.transport.label && <p>"{firstEvent.transport.label}"</p>}
        </div>

        {/* Journey Max Speed */}
        {vMax !== Number.POSITIVE_INFINITY && (
          <InfoLine display={"Vmax"}>
            <p>{vMax} km/h</p>
          </InfoLine>
        )}

        {/* Traction Unit, Wagon Count, Length/Weight */}
        {composition && (
          <>
            <div className={"flex flex-row space-x-3"}>
              <InfoLine display={"Traction Unit"}>
                <p>{tractionUnit?.railcar.name}</p>
              </InfoLine>
              <InfoLine display={"Wagon Count"}>
                <p>{composition.vehicles.length}</p>
              </InfoLine>
            </div>
            <div className={"flex flex-row space-x-3"}>
              <InfoLine display={"Length"}>
                <p>{Math.round(compositionLength ?? 0)}m</p>
              </InfoLine>
              <InfoLine display={"Weight"}>
                <p>{Math.round(compositionWeight ?? 0)}t</p>
              </InfoLine>
            </div>
          </>
        )}
      </InfoText>

      <InfoText heading={"Route"}>
        {/* Full/Playable Journey Route Parts */}
        <InfoLine display={"Full"}>
          <p>
            {firstEvent.stopPlace.name} &#8614; {lastEvent.stopPlace.name}
          </p>
        </InfoLine>
        {firstPlayableEvent && lastPlayableEvent && (
          <InfoLine display={"Playable"}>
            <p>
              {firstPlayableEvent.stopPlace.name} &#8614; {lastPlayableEvent.stopPlace.name}
            </p>
          </InfoLine>
        )}

        {/* Display Scheduled/Actual Arrival/Departure Time */}
        <div className={"flex flex-row space-x-3"}>
          {/* Actual or Scheduled Departure Time */}
          {journey.firstSeenTime && (
            <InfoLine display={"Departed"}>
              <p>{timeFormatter(journey.firstSeenTime)}</p>
            </InfoLine>
          )}
          {!journey.firstSeenTime && firstPlayableEvent && (
            <InfoLine display={"Departs"}>
              <p>~{timeFormatter(firstPlayableEvent.scheduledTime)}</p>
            </InfoLine>
          )}

          {journey.lastSeenTime && (
            <InfoLine display={"Arrived"}>
              <p>{timeFormatter(journey.lastSeenTime)}</p>
            </InfoLine>
          )}
          {!journey.lastSeenTime && lastPlayableEvent && (
            <InfoLine display={"Arrives"}>
              <p>~{timeFormatter(lastPlayableEvent.realtimeTime)}</p>
            </InfoLine>
          )}
        </div>
      </InfoText>
    </div>
  );
};
