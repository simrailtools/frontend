import { cn } from "@/lib/utils.ts";
import type { ComponentProps, FC, PropsWithChildren } from "react";

type BackgroundImageProps = {
  bgStyle?: "default" | "night" | "snow";
};

export const BackgroundImage: FC<PropsWithChildren<BackgroundImageProps & ComponentProps<"div">>> = ({
  bgStyle = "default",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "before:fixed before:h-full before:w-full before:-z-10 before:bg-cover before:blur before:scale-105",
        bgStyle === "default" && "before:bg-trains-normal",
        bgStyle === "night" && "before:bg-trains-night",
        bgStyle === "snow" && "before:bg-trains-snow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
