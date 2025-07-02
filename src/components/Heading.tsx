import type { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";

export const Heading: FC<PropsWithChildren<{ className?: string; level: 1 | 2 | 3 | 4 }>> = ({
  className,
  level,
  ...props
}) => {
  const HeadingComponent: "h1" | "h2" | "h3" | "h4" = `h${level}`;
  return (
    <HeadingComponent
      className={cn(
        level === 1 && "text-4xl font-medium sm:font-semibold",
        level === 2 && "text-2xl font-normal sm:font-semibold",
        level === 3 && "text-xl font-semibold",
        level === 4 && "text-xl font-medium",
        className,
      )}
      {...props}
    />
  );
};
