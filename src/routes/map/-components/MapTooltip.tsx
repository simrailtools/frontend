import type { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";

export const MapTooltip: FC<PropsWithChildren<{ className?: string; position?: "top" | "bottom" }>> = ({
  className,
  position = "top",
  children,
}) => (
  <div
    className={cn(
      "pointer-events-none absolute left-1/2 whitespace-nowrap rounded bg-white shadow",
      position === "top" && "-top-1.5 -translate-x-1/2 -translate-y-full",
      position === "bottom" && "top-full -translate-x-1/2 translate-y-1",
      className,
    )}
  >
    {children}
  </div>
);
