import type { JourneySnapshotWithRequiredPosition } from "@/routes/map/-lib/map.types.ts";
import { type FC, type PropsWithChildren, createContext, useContext, useState } from "react";

type SelectedJourneyContextType = {
  selectedJourney: JourneySnapshotWithRequiredPosition | null;
  setSelectedJourney: (selectedJourney: JourneySnapshotWithRequiredPosition | null) => void;
};

const SelectedJourneyContext = createContext<SelectedJourneyContextType>({
  selectedJourney: null,
  setSelectedJourney: () => {},
});

/**
 * Hook for the journey that was selected by the user.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedJourney = () => useContext(SelectedJourneyContext);

export const SelectedJourneyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedJourney, setSelectedJourney] = useState<JourneySnapshotWithRequiredPosition | null>(null);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourney, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
