import { BackgroundImage } from "@/components/BackgroundImage.tsx";
import type { FC } from "react";
import { MdRefresh } from "react-icons/md";

export const Throbber: FC = () => {
  return (
    <BackgroundImage>
      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        <MdRefresh className={"animate-spin w-24 h-24 text-white"} />
      </div>
    </BackgroundImage>
  );
};
