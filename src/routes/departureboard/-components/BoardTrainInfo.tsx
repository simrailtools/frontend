import type { BoardTransportDto, BoardViaEventDto } from "@/api/generated";
import { cn } from "@/lib/utils.ts";
import type { FC } from "react";

type BoardTrainInfoProps = {
  isFreight: boolean;
  via: Array<BoardViaEventDto>;
  transport: BoardTransportDto;
};

export const BoardTrainInfo: FC<BoardTrainInfoProps> = ({ isFreight, via, transport }) => {
  const formattedName = formatTrainName(transport);
  const allViaCancelled = via.every(entry => entry.cancelled);
  return (
    <div
      className={cn(
        "w-80 text-center rounded-lg py-1 px-2 ml-4 text-white text-4xl font-medium",
        "bg-gray-700",
        isFreight && "bg-gray-500",
        allViaCancelled && "bg-transparent text-gray-600 border-2",
      )}
    >
      <span
        className={cn("inline-block max-w-full whitespace-nowrap overflow-hidden", allViaCancelled && "line-through")}
      >
        {formattedName}
      </span>
    </div>
  );
};

/**
 * Formats the train name to display based on the given transport.
 * @param transport the transport to format.
 */
const formatTrainName = (transport: BoardTransportDto): string => {
  if (transport.line) {
    // include line if given, e.g. 'RPJ S41 (40199)'
    return `${transport.category} ${transport.line} (${transport.number})`;
  }

  // only display category and number, e.g. 'ECE 54001'
  return `${transport.category} ${transport.number}`;
};
