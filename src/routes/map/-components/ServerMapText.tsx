import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils.ts";

type ServerMapTextProps = {
  scenery: "FULL" | "WARSAW_LODZ_PSARY" | "WARSAW_LODZ_KRAKOW" | "WARSAW_LODZ_KATOWICE" | "WARSAW_KATOWICE_KRAKOW";
};

export const ServerMapText: FC<ServerMapTextProps & ComponentProps<"div">> = ({ scenery, className, ...props }) => {
  // don't display some map text if everything is included anyway
  if (scenery === "FULL") {
    return null;
  }

  return (
    <div className={cn("flex flex-row w-96 items-center text-black text-sm", className)} {...props}>
      <span>Map:&nbsp;</span>
      {scenery === "WARSAW_LODZ_PSARY" && <span>Warsaw - Łódź/Psary</span>}
      {scenery === "WARSAW_LODZ_KRAKOW" && <span>Warsaw - Łódź/Kraków</span>}
      {scenery === "WARSAW_LODZ_KATOWICE" && <span>Warsaw - Łódź/Katowice</span>}
      {scenery === "WARSAW_KATOWICE_KRAKOW" && <span>Warsaw - Katowice/Kraków</span>}
    </div>
  );
};
