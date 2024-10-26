import { StateCreator } from "zustand";
import { RootState } from "..";

export interface IDock {
  width: number;
  height: number;
  position: "left" | "right" | "top" | "bottom";
  magnification?: number;
  distance?: number;
  visibility?: "visible" | "hidden" | "intelligentHide";
}

export interface DockState {
  dock: IDock;
  setDockDimensions: (width: number, height: number) => void;
}
export const createDockSlice: StateCreator<RootState, [], [], DockState> = (
  set
) => ({
  dock: {
    height: 100,
    width: 1080,
    position: "bottom",
  },
  setDockDimensions: (width, height) =>
    set((state) => {
      state.dock.width = width;
      state.dock.height = height;
      return state;
    }),
});
