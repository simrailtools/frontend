import { useEffect, useState } from "react";

/**
 * Fetches the current document visibility.
 */
function resolveDocumentVisibility() {
  return document.visibilityState === "visible";
}

/**
 * Hook that returns true or false depending on the visibility of the current window.
 */
export const useDocumentVisibility = () => {
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => resolveDocumentVisibility());
  useEffect(() => {
    const handleVisibilityChange = () => setIsDocumentVisible(resolveDocumentVisibility());
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isDocumentVisible;
};
