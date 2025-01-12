import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins the inputs (conditionally) and deduplicates them using tailwind-merge.
 * @param inputs the inputs to join.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Returns the url to the medium steam avatar image associated with the given avatar hash.
 * @param avatarHash the hash of the avatar to get the url of.
 */
export const steamAvatarUrl = (avatarHash: string) => {
  return `https://avatars.steamstatic.com/${avatarHash}_medium.jpg`;
};
