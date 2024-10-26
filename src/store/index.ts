import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createWindowSlice, WindowState } from "./slices/window";
import { immer } from "zustand/middleware/immer";
import { createDockSlice, DockState } from "./slices/dock";
import { createSpotlightSlice, SpotlightState } from "./slices/spotlight";
import { createWidgetSlice, WidgetState } from "./slices/widget";

export type RootState = WindowState & DockState & SpotlightState & WidgetState;
export const useRootStore = create<RootState>()(
  devtools(
    immer((...a) => ({
      ...createWindowSlice(...a),
      ...createDockSlice(...a),
      ...createSpotlightSlice(...a),
      ...createWidgetSlice(...a),
    }))
  )
);
