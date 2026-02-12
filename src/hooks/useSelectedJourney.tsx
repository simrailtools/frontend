import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import type { JourneyUpdateFrame } from "@/api/proto/event_bus_pb.ts";
import type { JourneyBaseData } from "@/hooks/useLiveJourneyData.tsx";
import type { NatsSyncedEntry } from "@/hooks/useNatsSyncedList.tsx";

type SelectedJourney = NatsSyncedEntry<JourneyBaseData, JourneyUpdateFrame>;

type SelectedJourneyContextType = {
  selectedJourney: SelectedJourney | null;
  setSelectedJourney: Dispatch<SetStateAction<SelectedJourney | null>>;
};

const SelectedJourneyContext = createContext<SelectedJourneyContextType>({
  selectedJourney: null,
  setSelectedJourney: () => {},
});

/**
 * Hook for the journey that was selected by the user.
 */
export const useSelectedJourney = () => useContext(SelectedJourneyContext);

export const SelectedJourneyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedJourney, setSelectedJourney] = useState<SelectedJourney | null>(null);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourney, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
