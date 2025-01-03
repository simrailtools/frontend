import errorIcon from "@/assets/icons/error.svg";
import refreshIcon from "@/assets/icons/refresh.svg";
import { cn } from "@/lib/utils.ts";
import L, { type BaseIconOptions, type Icon, type PointExpression } from "leaflet";

/**
 * Options for construction of a leaflet marker icon.
 */
export type IconOptions = {
  url?: string;
  alt?: string;
  className?: string;
  isLoading?: boolean;
  popupAnchor?: PointExpression;
};

/**
 * Constructs a leaflet marker icon based on the given options. Displays a
 * loading spinner if isLoading is true, and error if the url is not given or
 * the requested image in all other cases. In case the image couldn't be
 * loaded a fallback error icon is displayed instead.
 * @param options the options for building the icon.
 */
export const constructIcon = (options: IconOptions): Icon<BaseIconOptions> => {
  const { url, isLoading } = options;

  // loading icon if the information is currently loading
  if (isLoading) {
    return constructIconInternal({
      ...options,
      alt: "Loading",
      url: refreshIcon,
      imgClassName: "animate-spin",
    });
  }

  // display the image url as requested if the url is present
  if (url) {
    return constructIconInternal(options);
  }

  // display a load error if the url is not present/couldn't be loaded
  return constructIconInternal({
    ...options,
    url: errorIcon,
    alt: "Load Error",
  });
};

/**
 * Internal helper method to construct leaflet marker icon.
 * @param options the options for building the icon.
 */
const constructIconInternal = (options: IconOptions & { imgClassName?: string }): Icon<BaseIconOptions> => {
  const { url, alt, className, popupAnchor, imgClassName = "" } = options;
  return L.divIcon({
    html: `
      <div class="${cn("flex items-center justify-center bg-gray-700 border-solid border-2 overflow-hidden", className)}">
        <img 
          src="${url}" 
          alt="${alt}" 
          class="h-full w-full ${imgClassName}" 
          onerror="this.src='data:image/svg+xml;base64,${btoa(errorIcon)}'; if ('${imgClassName}'.trim()) { this.classList.remove('${imgClassName}'); }"
        />
      </div>
    `,
    className: "",
    iconSize: [30, 30],
    popupAnchor,
  });
};
