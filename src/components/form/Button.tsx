import { cn } from "@/lib/utils.ts";
import { type ComponentProps, type FC, forwardRef } from "react";

export const Button: FC<ComponentProps<"button">> = forwardRef(({ children, className = "", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-block bg-blue-500 text-white font-medium rounded-lg px-4 py-2 enabled:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition",
      className,
    )}
    {...props}
  >
    {children}
  </button>
));
