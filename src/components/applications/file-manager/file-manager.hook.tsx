import { useRootStore } from "@/store";
import { IWindow } from "@/store/slices/window";
import dynamic from "next/dynamic";
import { FILE_MANAGER_CONFIG } from "./file-manager.utils";
import { useCallback } from "react";
import { DraggableData } from "react-rnd";

const FileManagerApplication = dynamic(
  () => import("./file-manager.application"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const useFileManagerWindow = () => {
  const {
    removeFromActiveWindows,
    addToActiveWindows,
    updateWindowCoordinates,
    maximizeWindow,
    minimizeWindow,
  } = useRootStore((state) => state);

  const handleWindowClose = useCallback(
    (window: IWindow) => removeFromActiveWindows(window),
    [removeFromActiveWindows]
  );

  const handleWindowDragStop = useCallback(
    (window: IWindow, data: DraggableData) =>
      updateWindowCoordinates(window, { x: data.x, y: data.y }),
    [updateWindowCoordinates]
  );

  const handleWindowMaximize = useCallback(
    (window: IWindow) => maximizeWindow(window),
    [maximizeWindow]
  );

  const handleWindowMinimize = useCallback(
    (window: IWindow) => minimizeWindow(window),
    [minimizeWindow]
  );

  const addFileManagerToWindowStack = () => {
    addToActiveWindows({
      ...FILE_MANAGER_CONFIG,
      component: <FileManagerApplication />,
      open: false,
      minimized: false,
      maximized: false,
      close: false,
      onWindowClose: handleWindowClose,
      onWindowDragStop: handleWindowDragStop,
      onWindowMaximize: handleWindowMaximize,
      onWindowMinimize: handleWindowMinimize,
    } as IWindow);
  };

  return { addFileManagerToWindowStack };
};
export default useFileManagerWindow;
