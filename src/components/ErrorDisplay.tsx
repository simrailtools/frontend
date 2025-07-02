import type { FC } from "react";
import { MdError } from "react-icons/md";
import { BackgroundImage } from "@/components/BackgroundImage.tsx";
import { Heading } from "@/components/Heading.tsx";

export const ErrorDisplay: FC<{ errorMessage?: string }> = ({ errorMessage }) => {
  return (
    <BackgroundImage>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 m-4 max-w-lg">
          <div className="flex flex-row items-center mb-4">
            <MdError className="h-14 w-14 text-red-600" />
            <Heading level={2} className="text-gray-800 font-semibold pl-4">
              {"OOPS, something went wrong!"}
            </Heading>
          </div>
          <Heading level={4} className="text-gray-600 text-center text-pretty">
            {
              "An error has occurred, check the error details for further information. If you're unsure how this happened, please try again later."
            }
          </Heading>
          {errorMessage && (
            <div className="text-sm text-gray-500 text-center text-pretty mt-6">{`Error Details: ${errorMessage}`}</div>
          )}
        </div>
      </div>
    </BackgroundImage>
  );
};
