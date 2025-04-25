import type { FC } from "react";

export const BoardTableHeading: FC = () => {
  return (
    <div className={"flex pt-2 px-2 font-semibold text-gray-600"}>
      <div className={"ml-3"}>Time</div>
      <div className={"ml-26"}>Train</div>
      <div className={"ml-[300px]"}>Destination</div>
      <div className={"ml-auto"}>Platform / Track</div>
    </div>
  );
};
