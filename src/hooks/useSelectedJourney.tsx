import { createContext, type FC, type PropsWithChildren, useContext, useState } from "react";
import { tools } from "@/api/proto/bundle";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";

import JourneyUpdateFrame = tools.simrail.backend.JourneyUpdateFrame;

type SelectedJourney = NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;

type SelectedJourneyContextType = {
  selectedJourney: SelectedJourney | null;
  setSelectedJourney: (selectedJourney: SelectedJourney | null) => void;
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
  const [selectedJourney, setSelectedJourney] = useState<SelectedJourney | null>(null);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourney, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
