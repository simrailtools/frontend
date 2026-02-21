import { useRouter } from "@tanstack/react-router";
import { type FC, useCallback, useState } from "react";
import { cn } from "@/lib/utils.ts";

export const JourneyTrackingLinkButton: FC<{ journeyId: string }> = ({ journeyId }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const handleButtonClick = useCallback(() => {
    const href = router.buildLocation({
      to: ".",
      search: prev => ({
        ...prev,
        selectedJourneyId: journeyId,
      }),
    }).publicHref;
    navigator.clipboard.writeText(window.location.origin + href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [journeyId, router.buildLocation]);

  return (
    <button
      type={"button"}
      disabled={copied}
      onClick={handleButtonClick}
      className={cn(
        "flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold",
        "py-2 px-4 rounded-lg text-nowrap cursor-pointer disabled:cursor-not-allowed",
      )}
    >
      {copied ? "✓ Copied" : "Copy Link"}
    </button>
  );
};
