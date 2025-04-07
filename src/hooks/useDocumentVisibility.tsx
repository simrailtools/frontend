import { useEffect, useState } from "react";

/**
 * Hook that returns true or false depending on the visibility of the current window.
 */
export const useDocumentVisibility = () => {
  const [isDocumentVisible, setIsDocumentVisible] = useState(document.visibilityState === "visible");

  useEffect(() => {
    const handleVisibilityChange = () => {
      const documentVisible = document.visibilityState === "visible";
      setIsDocumentVisible(documentVisible);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isDocumentVisible;
};
