import type { BoardViaEventDto } from "@/api/generated";
import { cn } from "@/lib/utils.ts";
import { type FC, Fragment, type JSX, useEffect, useRef, useState } from "react";

type BoardViaInfoProps = {
  via: Array<BoardViaEventDto>;
};

export const BoardViaInfo: FC<BoardViaInfoProps> = ({ via }) => {
  // code that checks if the via text is overflowing the width of the screen
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const checkOverflow = () => setIsOverflowing(container.scrollWidth > container.clientWidth);
      checkOverflow(); // initial check

      window.addEventListener("resize", checkOverflow);
      return () => window.removeEventListener("resize", checkOverflow);
    }
  }, []);

  const viaPoints = createViaElements(via);
  return (
    <div ref={containerRef} className={"ml-7 pt-2 overflow-hidden h-max text-start w-3/4"}>
      <div
        className={cn(
          "inline-block whitespace-nowrap text-2xl text-black tracking-tight",
          isOverflowing && "animate-marquee",
        )}
      >
        <span className={"mt-4"}>{...viaPoints}</span>
        {isOverflowing && <span> +++&nbsp;</span>}
        {isOverflowing && <span className={"mt-4"}>{...viaPoints} +++&nbsp;</span>}
      </div>
    </div>
  );
};

/**
 * Creates an element array for the via stops to display.
 * @param via all via stops for the board entry.
 */
const createViaElements = (via: Array<BoardViaEventDto>): Array<JSX.Element> => {
  const viaWithPassengerChange = via.filter(entry => entry.passengerChange);
  const relevantVia = viaWithPassengerChange.length ? viaWithPassengerChange : via;

  const maxIndex = relevantVia.length - 2;
  return relevantVia.slice(0, -1).map((entry, index) => (
    <Fragment key={entry.pointId}>
      <span className={cn(entry.cancelled && "line-through")}>{entry.pointName}</span>
      {index < maxIndex && ", "}
    </Fragment>
  ));
};
