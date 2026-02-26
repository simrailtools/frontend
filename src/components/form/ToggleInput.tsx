import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils.ts";

export const ToggleInput: FC<Omit<ComponentProps<"input">, "type">> = ({ className = "", ref, ...props }) => (
  <label className={cn("relative inline-flex items-center cursor-pointer", className)}>
    <input type="checkbox" className="sr-only peer" {...props} ref={ref} />
    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-blue-500 transition-all" />
    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform" />
  </label>
);
