import { StateCreator } from "zustand";
import { RootState } from "..";
import { IWindow } from "./window";

export interface IWidget extends IWindow {
  widgetId?: string;
}
export interface WidgetState {
  widgets: IWidget[];
  addToWidgetList: (widget: IWidget) => void;
}

export const createWidgetSlice: StateCreator<RootState, [], [], WidgetState> = (
  set
) => ({
  widgets: [],
  addToWidgetList: (widget: IWidget) =>
    set((state) => {
      widget.created = new Date().getTime();
      state.widgets.push(widget);
      return state;
    }),
});
