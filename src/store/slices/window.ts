import { StateCreator } from "zustand";
import { RootState } from "..";
import { DraggableData } from "react-rnd";
import { getViewportDimensions } from "@/lib/utils";

export interface WindowCoordinates {
  x: number;
  y: number;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

export interface WindowActions {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  close: boolean;
  showMinimize: boolean;
  showMaximize: boolean;
  showClose: boolean;
}

export interface WindowPreview {
  preview?: {
    id: string;
    name: string;
    url: string | null;
  };
}

export interface WindowEventCallbacks {
  onWindowDragStop?: (Window: IWindow, data: DraggableData) => void;
  onWindowMaximize?: (window: IWindow) => void;
  onWindowMinimize?: (window: IWindow) => void;
  onWindowClose?: (window: IWindow) => void;
  onWindowClickOutside?: (window: IWindow) => void;
}

export interface IWindow
  extends WindowCoordinates,
    WindowDimensions,
    WindowEventCallbacks,
    WindowPreview,
    WindowActions {
  id: string;
  class: string;
  name: string;
  type: "system" | "application";
  icon?: string;
  title: string;
  component: JSX.Element | null;
  backdrop?: boolean;
  resizable: boolean;
  draggable: boolean;
  showTitleBar: boolean;
  instanceCount?: number;
  generatePreview?: boolean;
  visibility?: "visible" | "hidden";
  dragAxis?: "x" | "y" | "both" | "none";
  created?: number;
}

export interface WindowState {
  activeWindows: IWindow[];

  maximizeWindow: (window: IWindow) => void;
  minimizeWindow: (window: IWindow) => void;
  addToActiveWindows: (window: IWindow) => void;
  removeFromActiveWindows: (window: IWindow) => void;
  updateWindowCoordinates: (
    window: IWindow,
    coordinates: WindowCoordinates
  ) => void;

  setWindowPreview: (
    window: IWindow,
    preview: WindowPreview["preview"]
  ) => void;
  restoreMinimizedWindow: (window: IWindow) => void;
}
export const createWindowSlice: StateCreator<RootState, [], [], WindowState> = (
  set
) => ({
  activeWindows: [],
  addToActiveWindows: (window: IWindow) =>
    set((state) => {
      window.created = new Date().getTime();
      window.instanceCount = 0;

      const existingWindow = state.activeWindows
        .slice()
        .reverse()
        .find((w) => w.id === window.id);
      if (existingWindow) {
        window.instanceCount = existingWindow.instanceCount! + 1;
      }
      state.activeWindows.push(window);
      return state;
    }),
  removeFromActiveWindows: (window: IWindow) =>
    set((state) => ({
      activeWindows: state.activeWindows.filter(
        (w) => !(w.id === window.id && w.instanceCount === window.instanceCount)
      ),
    })),
  updateWindowCoordinates: (window: IWindow, coordinates: WindowCoordinates) =>
    set((state) => {
      const win = state.activeWindows.find(
        (w) => w.id === window.id && w.instanceCount === window.instanceCount
      );
      if (win) {
        win.x = coordinates.x;
        win.y = coordinates.y;
      }
      return state;
    }),
  maximizeWindow: (window: IWindow) =>
    set((state) => {
      const win = state.activeWindows.find(
        (w) => w.id === window.id && w.instanceCount === window.instanceCount
      );
      if (win) {
        win.maximized = true;
        win.minimized = false;
        win.width = getViewportDimensions().width;
        win.height = getViewportDimensions().height;
      }
      return state;
    }),
  minimizeWindow: (window: IWindow) =>
    set((state) => {
      const win = state.activeWindows.find(
        (w) => w.id === window.id && w.instanceCount === window.instanceCount
      );
      if (win) {
        win.minimized = true;
        win.maximized = false;
      }
      return state;
    }),
  setWindowPreview: (window: IWindow, preview: WindowPreview["preview"]) =>
    set((state) => {
      const win = state.activeWindows.find(
        (w) => w.id === window.id && w.instanceCount === window.instanceCount
      );
      if (win) {
        win.preview = preview;
      }
      return state;
    }),
  restoreMinimizedWindow: (window: IWindow) =>
    set((state) => {
      const win = state.activeWindows.find(
        (w) => w.id === window.id && w.instanceCount === window.instanceCount
      );
      if (win) {
        win.minimized = false;
      }
      return state;
    }),
});
