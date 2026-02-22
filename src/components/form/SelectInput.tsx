import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";

export const SelectInput: FC<PropsWithChildren<ComponentProps<"select">>> = ({
  children,
  className = "",
  ref,
  ...props
}) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={cn(
        "block w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-gray-400 transition",
        className,
      )}
      {...props}
    >
      {children}
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
      <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <title>Dropdown Arrow</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06-.02L10 10.674l3.71-3.486a.75.75 0 111.04 1.084l-4.24 3.99a.75.75 0 01-1.04 0l-4.24-3.99a.75.75 0 01-.02-1.06z"
        />
      </svg>
    </div>
  </div>
);
