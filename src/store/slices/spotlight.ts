import { StateCreator } from "zustand";
import { RootState } from "..";

export interface ISpotlight {
  open: boolean;
}
export interface SpotlightState {
  spotlight: ISpotlight;
  toggleSpotlight: (state: boolean) => void;
}
export const createSpotlightSlice: StateCreator<
  RootState,
  [],
  [],
  SpotlightState
> = (set) => ({
  spotlight: {
    open: false,
  },
  toggleSpotlight: (val) =>
    set((state) => {
      state.spotlight.open = val;
      return state;
    }),
});
