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

const SelectedJourneyContext = createContext<SelectedJourneyContextType | undefined>(undefined);

export const useSelectedJourney = () => {
  const context = useContext(SelectedJourneyContext);
  if (!context) {
    throw new Error("useSelectedJourney must be used with SelectedJourneyProvider");
  }

  return context;
};

export const SelectedJourneyProvider: FC<PropsWithChildren<Pick<SelectedJourneyContextType, "selectedJourneyId">>> = ({
  children,
  selectedJourneyId: initialSelectedJourney,
}) => {
  const [selectedJourneyId, setSelectedJourney] = useState<string | undefined>(initialSelectedJourney);
  return (
    <SelectedJourneyContext.Provider value={{ selectedJourneyId, setSelectedJourney }}>
      {children}
    </SelectedJourneyContext.Provider>
  );
};
