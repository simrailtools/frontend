import type { BoardViaEventDto } from "@/api/generated";
import { cn } from "@/lib/utils.ts";
import type { FC } from "react";

type BoardDestinationInfoProps = {
  currentPointName: string;
  via: Array<BoardViaEventDto>;
};

export const BoardDestinationInfo: FC<BoardDestinationInfoProps> = ({ currentPointName, via }) => {
  const [pointName, diffType] = findDestination(via);
  return (
    <span
      className={cn(
        "text-5xl font-bold ml-4 whitespace-nowrap",
        diffType === "schedule" && "text-black",
        diffType === "canceled" && "text-red-600",
        diffType === "additional" && "text-green-600",
      )}
    >
      {pointName ?? currentPointName}
    </span>
  );
};

/**
 * Resolves the destination station from the given via array, also
 * indicating if the destination is scheduled, canceled or additional.
 * @param via the via events of the board entry to find the destination of.
 */
const findDestination = (via: Array<BoardViaEventDto>): [string | null, "schedule" | "additional" | "canceled"] => {
  const viaWithPassengerChange = via.filter(entry => entry.passengerChange);
  const relevantVia = viaWithPassengerChange.length ? viaWithPassengerChange : via;

  const destination = relevantVia.slice(-1)[0];
  const firstCancelledViaIndex = relevantVia.findIndex(entry => entry.cancelled);
  if (firstCancelledViaIndex === -1) {
    // no canceled event, destination is equal to schedule+
    const diffType = destination.additional ? "additional" : "schedule";
    return [destination.pointName, diffType];
  }

  if (firstCancelledViaIndex === 0) {
    // the first event is canceled, train ends at the current point
    return [null, "canceled"];
  }

  // train ends at the first non-canceled via point
  const actualDestination = relevantVia[firstCancelledViaIndex - 1];
  return [actualDestination.pointName, "canceled"];
};
