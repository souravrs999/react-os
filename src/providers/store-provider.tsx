"use client";
import { RootState, useRootStore } from "@/store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

const RootStoreContext = createContext(useRootStore);
export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useRef(useRootStore);
  return (
    <RootStoreContext.Provider value={store.current}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootContext = <T,>(selector: (state: RootState) => T): T => {
  const store = useContext(RootStoreContext);
  return useStore(store, selector);
};
