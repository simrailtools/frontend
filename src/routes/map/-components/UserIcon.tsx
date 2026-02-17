import { type FC, useMemo, useState } from "react";
import type { SimRailUserDto } from "@/api/rest";
import errorIcon from "@/assets/icons/error.svg";
import personOffIcon from "@/assets/icons/person_off.svg";
import refreshIcon from "@/assets/icons/refresh.svg";
import { cn } from "@/lib/utils.ts";

type UserIconProps = {
  hasUser: boolean;
  userInfoLoading: boolean;
  userInfo: SimRailUserDto | undefined;
  className?: string;
};

type ImageAttributes = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Resolves the image attributes to use based of the provided component properties.
 * @param hasUser if a user is present.
 * @param isLoading if user details are currently fetched from the backend.
 * @param hasLoadError if an error occured while loading the user icon.
 * @param userInfo the user info that was resolved, undefined if none.
 */
const resolveUserIconImageAttributes = (
  hasUser: boolean,
  isLoading: boolean,
  hasLoadError: boolean,
  userInfo: SimRailUserDto | undefined,
): ImageAttributes => {
  if (!hasUser) {
    return { src: personOffIcon, alt: "Bot Icon", className: "p-1" };
  }

  if (isLoading) {
    return { src: refreshIcon, alt: "Loading Icon", className: "animate-spin" };
  }

  if (!userInfo || hasLoadError) {
    return { src: errorIcon, alt: "Unavailable User Icon" };
  }

  return { src: userInfo.avatarUrl, alt: `Avatar of ${userInfo.name}` };
};

export const UserIcon: FC<UserIconProps> = ({ hasUser, userInfoLoading, userInfo, className }) => {
  const [hasLoadError, setHasLoadError] = useState(false);
  const {
    src,
    alt,
    className: imgClassName,
  } = useMemo(
    () => resolveUserIconImageAttributes(hasUser, userInfoLoading, hasLoadError, userInfo),
    [hasUser, userInfoLoading, hasLoadError, userInfo],
  );

  return (
    <div
      className={cn("flex items-center justify-center bg-gray-700 border-solid border-2 overflow-hidden", className)}
    >
      <img src={src} alt={alt} className={cn("h-full w-full", imgClassName)} onError={() => setHasLoadError(true)} />
    </div>
  );
};
