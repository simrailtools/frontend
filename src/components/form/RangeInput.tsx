import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils.ts";

export const RangeInput: FC<Omit<ComponentProps<"input">, "type">> = ({ className, value, ref, ...props }) => (
  <div className="flex items-center w-full space-x-4">
    <input
      ref={ref}
      type={"range"}
      className={cn(
        "w-full h-2 bg-gray-200 rounded-lg accent-blue-400 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition",
        className,
      )}
      value={value}
      {...props}
    />
    <span className="w-12 text-right text-gray-700">{value}</span>
  </div>
);
