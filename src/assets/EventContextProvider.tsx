import React, { useRef } from "react";
import { EventContext } from "../contexts/EventContext";

interface EventContextProviderProps {
  children?: React.ReactNode;
}

type ListenersMap = Map<string, Array<(data: any) => void>>;

export function EventContextProvider({ children }: EventContextProviderProps) {
  // Create an event emitter pattern
  const listenersRef = useRef<ListenersMap>(new Map());

  const dispatch = (event: string, data?: unknown) => {
    const callbacks = listenersRef.current.get(event) ?? [];
    for (const callback of callbacks) {
      callback(data);
    }
  };

  const on = (event: string, callback: (data?: unknown) => void) => {
    // register listener
    if (!listenersRef.current.has(event)) {
      listenersRef.current.set(event, []);
    }

    listenersRef.current.get(event)?.push(callback);

    // Return unsubscribe function
    return () => {
      listenersRef.current.get(event)?.filter((cb) => cb !== callback);
    };
  };

  return <EventContext value={{ dispatch, on }}>{children}</EventContext>;
}
