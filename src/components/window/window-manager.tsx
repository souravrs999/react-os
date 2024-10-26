"use client";
import { useRootStore } from "@/store";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, HTMLAttributes, memo, useMemo } from "react";
import Window from "./window";

const windowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

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
          <motion.div
            key={`${window.id}-${window.instanceCount}`}
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              type: "spring",
              damping: 20,
              stiffness: 120,
            }}
          >
            <Window {...window}>{component}</Window>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
export default memo(WindowManager);
