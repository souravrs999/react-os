"use client";
import { useRootStore } from "@/store";
import { AnimatePresence } from "framer-motion";
import { FC, HTMLAttributes, useEffect } from "react";
import { Calendar } from "../ui/calendar";

type WidgetManagerProps = HTMLAttributes<HTMLDivElement> & {};
const WidgetManager: FC<WidgetManagerProps> = () => {
  const { widgets, addToWidgetList } = useRootStore((state) => state);

  useEffect(() => {
    addToWidgetList({
      id: "widget-calendar",
      class: "widget__calendar",
      name: "widget calendar",
      title: "Calendar",
      type: "system",
      widgetId: "calendar",
      resizable: false,
      draggable: true,
      showTitleBar: false,
      x: 5,
      y: 5,
      width: 300,
      height: 500,
      minimized: false,
      maximized: false,
      component: (
        <div className="bg-background/40 backdrop-blur-md border border-border/40 w-fit rounded-xl">
          <Calendar />
        </div>
      ),
    });
  }, []);
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
