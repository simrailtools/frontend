import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins the inputs (conditionally) and deduplicates them using tailwind-merge.
 * @param inputs the inputs to join.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
