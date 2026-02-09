import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { tools } from "@/api/proto/bundle";
import type { UserDto } from "@/api/rest";

import UserPlatform = tools.simrail.backend.UserPlatform;
import User = tools.simrail.backend.User;

/**
 * Joins the inputs (conditionally) and deduplicates them using tailwind-merge.
 * @param inputs the inputs to join.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 *
 * @param user
 */
export const mapUserToDto = (user: User): UserDto => {
  return { id: user.id, platform: USER_PLATFORM_MAPPING[user.platform] };
};
