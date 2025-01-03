import { createContext, type FC, type PropsWithChildren, useContext, useState } from "react";
import type { JourneySnapshotFrame } from "../api/types/event.types.ts";

type SelectedJourneyContextType = {
  selectedJourney: JourneySnapshotFrame | null;
  setSelectedJourney: (selectedJourney: JourneySnapshotFrame | null) => void;
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
  const [selectedJourney, setSelectedJourney] = useState<JourneySnapshotFrame | null>(null);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourney, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
