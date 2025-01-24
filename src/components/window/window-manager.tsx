"use client";
import { useRootStore } from "@/store";
import { AnimatePresence } from "framer-motion";
import { FC, HTMLAttributes, memo, useMemo } from "react";
import Window from "./window";

type WindowManagerProps = HTMLAttributes<HTMLDivElement> & {};
const WindowManager: FC<WindowManagerProps> = () => {
  const activeWindows = useRootStore((state) => state.activeWindows);
  const visibleWindows = useMemo(
    () =>
      activeWindows.filter((w) => !w.minimized && w.visibility !== "hidden"),
    [activeWindows]
  );

  return (
    <AnimatePresence>
      {visibleWindows.map((window) => {
        const { component } = window;
        return (
          <Window key={`${window.id}-${window.instanceCount}`} {...window}>
            {component}
          </Window>
        );
      })}
    </AnimatePresence>
  );
};
export default memo(WindowManager);
