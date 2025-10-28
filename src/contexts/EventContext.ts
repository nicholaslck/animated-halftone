import { createContext } from "react";

interface EventContextType {
  dispatch: (event: string, data?: unknown) => void;
  on: (event: string, callback: (data?: unknown) => void) => () => void;
}

export const EventContext = createContext<EventContextType>(
  {} as EventContextType
);
