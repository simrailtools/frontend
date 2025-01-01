import { type ClassValue, clsx } from "clsx";

/**
 * Joins the inputs (conditionally) and deduplicates them using tailwind-merge.
 * @param inputs the inputs to join.
 */
// TODO: add tailwind-merge into the mix once its released for v4
// with tw-merge: twMerge(clsx(inputs))
export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

/**
 * Returns the url to the medium steam avatar image associated with the given avatar hash.
 * @param avatarHash the hash of the avatar to get the url of.
 */
export const steamAvatarUrl = (avatarHash: string) => {
  return `https://avatars.steamstatic.com/${avatarHash}_medium.jpg`;
};
