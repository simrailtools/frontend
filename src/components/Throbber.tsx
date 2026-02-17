import type { FC } from "react";
import { MdRefresh } from "react-icons/md";
import { BackgroundImage } from "@/components/BackgroundImage.tsx";

export const Throbber: FC = () => (
  <BackgroundImage>
    <div className={"flex flex-col justify-center items-center min-h-screen"}>
      <MdRefresh className={"animate-spin w-24 h-24 text-white"} />
    </div>
  </BackgroundImage>
);
