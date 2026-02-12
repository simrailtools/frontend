import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type SelectedJourneyContextType = {
  selectedJourneyId: string | undefined;
  setSelectedJourney: Dispatch<SetStateAction<string | undefined>>;
};

// biome-ignore lint/style/noNonNullAssertion: never called, hook is always initialized
const SelectedJourneyContext = createContext<SelectedJourneyContextType>(null!);

/**
 * Hook for the journey that was selected by the user.
 */
export const useSelectedJourney = () => useContext(SelectedJourneyContext);

export const SelectedJourneyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedJourneyId, setSelectedJourney] = useState<string | undefined>(undefined);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourneyId, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
