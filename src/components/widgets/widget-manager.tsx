"use client";
import { useRootStore } from "@/store";
import { AnimatePresence } from "framer-motion";
import { FC, HTMLAttributes } from "react";

type WidgetManagerProps = HTMLAttributes<HTMLDivElement> & {};
const WidgetManager: FC<WidgetManagerProps> = () => {
  const { widgets } = useRootStore((state) => state);

  return (
    <AnimatePresence>
      {widgets.map((widget) => {
        const { component } = widget;
        return <div key={widget.widgetId}>{component}</div>;
      })}
    </AnimatePresence>
  );
};
export default WidgetManager;
