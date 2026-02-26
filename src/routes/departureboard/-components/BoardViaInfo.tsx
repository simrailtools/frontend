import { type FC, Fragment, type JSX, useEffect, useMemo, useRef, useState } from "react";
import type { BoardViaEventDto } from "@/api/rest";
import { cn } from "@/lib/utils.ts";

type BoardViaInfoProps = {
  via: BoardViaEventDto[];
};

export const BoardViaInfo: FC<BoardViaInfoProps> = ({ via }) => {
  const viaPoints = useMemo(() => createViaElements(via), [via]);

  // handling of overflow on the screen
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedDivRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    const animated = animatedDivRef.current;
    if (!container || !animated) {
      return;
    }

    const recalc = () => {
      // update the overflow state
      const isOverflowing = animated.scrollWidth > container.clientWidth + 1;
      setIsOverflowing(isOverflowing);

      // update the animation duration
      if (isOverflowing) {
        const textWidth = animated.scrollWidth;
        const containerWidth = container.getBoundingClientRect().width;
        const duration = (textWidth + containerWidth) / 75; // 75px/s
        animated.style.animationDuration = `${duration.toFixed(0)}s`;
      } else {
        animated.style.animationDuration = "";
      }
    };
    recalc(); // initial recalculation

    // resize observer to trigger recalculation for future layout changes
    const resizeObserver = new ResizeObserver(recalc);
    resizeObserver.observe(container);
    resizeObserver.observe(animated);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={"ml-7 pt-2 overflow-hidden h-max text-start w-3/4"}>
      <div
        ref={animatedDivRef}
        className={cn(
          "inline-block whitespace-nowrap text-2xl text-black tracking-tight",
          isOverflowing && "animate-marquee",
        )}
      >
        <span className={"mt-4"}>{...viaPoints}</span>
        {/** biome-ignore lint/nursery/noLeakedRender: biomejs/biome#8664 */}
        {isOverflowing && <span> +++&nbsp;</span>}
        {/** biome-ignore lint/nursery/noLeakedRender: biomejs/biome#8664 */}
        {isOverflowing && <span className={"mt-4"}>{...viaPoints} +++&nbsp;</span>}
        {/** biome-ignore lint/nursery/noLeakedRender: biomejs/biome#8664 */}
        {isOverflowing && <span className={"mt-4"}>{...viaPoints} +++&nbsp;</span>}
        {/** biome-ignore lint/nursery/noLeakedRender: biomejs/biome#8664 */}
        {isOverflowing && <span className={"mt-4"}>{...viaPoints} +++&nbsp;</span>}
      </div>
    </div>
  );
};

/**
 * Creates an element array for the via stops to display.
 * @param via all via stops for the board entry.
 */
const createViaElements = (via: BoardViaEventDto[]): JSX.Element[] => {
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
