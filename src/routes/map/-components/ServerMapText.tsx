import { cn } from "@/lib/utils.ts";
import type { ComponentProps, FC } from "react";

type ServerMapTextProps = {
  scenery: "WARSAW_LODZ_PSARY" | "WARSAW_LODZ_KRAKOW" | "WARSAW_KATOWICE_KRAKOW";
};

export const ServerMapText: FC<ServerMapTextProps & ComponentProps<"div">> = ({ scenery, className, ...props }) => {
  return (
    <div className={cn("flex flex-row w-96 items-center text-black text-sm", className)} {...props}>
      <span>Map:&nbsp;</span>
      {scenery === "WARSAW_KATOWICE_KRAKOW" && <span>Warsaw - Katowice/Kraków</span>}
      {scenery === "WARSAW_LODZ_PSARY" && <span>Warsaw - Łódź/Psary</span>}
      {scenery === "WARSAW_LODZ_KRAKOW" && <span>Warsaw - Łódź/Kraków</span>}
    </div>
  );
};
