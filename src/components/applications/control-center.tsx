"use client";
import { FC, HTMLAttributes } from "react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useRootStore } from "@/store";
import AlarmClockWidget from "@/components/widgets/alarm";
import ScoreBoard from "@/components/widgets/score-board";
import StudyTimerWidget from "@/components/widgets/study-timer";
import SystemInformationWidget from "@/components/widgets/system-info";
import WifiWidget from "@/components/widgets/wifi";
import { WindowCoordinates, WindowDimensions } from "@/store/slices/window";
import ThemeSwitcherWidget from "../widgets/theme-switcher";
import { getViewportDimensions } from "@/lib/utils";
import LightControlWidget from "../widgets/light-controls";
import ClockWidget from "../widgets/clock-widget";
import VolumeControlWidget from "../widgets/volume-control";
import { motion } from "framer-motion";

const CONTROL_CENTER_DIMENSIONS: WindowDimensions = {
  width: 700,
  height: 600,
};
const CONTROL_CENTER_COORDINATES: WindowCoordinates = {
  x: (getViewportDimensions().width - CONTROL_CENTER_DIMENSIONS.width) / 2,
  y: (getViewportDimensions().height - CONTROL_CENTER_DIMENSIONS.height) / 2,
};

type ControlCenterLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const ControlCenterLauncher: FC<ControlCenterLauncherProps> = ({
  size = 100,
}) => {
  const { addToActiveWindows, removeFromActiveWindows } = useRootStore(
    (state) => state
  );

  const addControlCenterToWindowStack = () => {
    addToActiveWindows({
      id: "control-center",
      class: "application__control-center",
      name: "control-center",
      title: "Control Center",
      icon: "/assets/icons/icon-tiles.png",
      type: "system",
      component: <ControlCenter.Application />,
      resizable: false,
      draggable: false,
      showTitleBar: false,
      x: CONTROL_CENTER_COORDINATES.x,
      y: CONTROL_CENTER_COORDINATES.y,
      width: CONTROL_CENTER_DIMENSIONS.width,
      height: CONTROL_CENTER_DIMENSIONS.height,
      open: false,
      minimized: false,
      maximized: false,
      close: false,
      showMinimize: false,
      showMaximize: false,
      showClose: false,
      backdrop: true,
      onWindowClickOutside: (window) => removeFromActiveWindows(window),
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div onClick={addControlCenterToWindowStack}>
            <Image
              src="/assets/icons/icon-tiles.png"
              width={size}
              height={size}
              alt="icon-tiles"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Control Center</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type ControlCenterApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const ControlCenterApplication: FC<ControlCenterApplicationProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-12 p-4 gap-4 auto-rows-[2.25rem]">
        <div className="col-span-4 row-start-1 row-end-5">
          <WifiWidget />
        </div>
        <div className="col-span-4 row-start-1 row-end-5">
          <SystemInformationWidget />
        </div>
        <div className="col-span-8 row-start-5 row-end-10">
          <ScoreBoard />
        </div>
        <div className="col-span-4 row-start-1 row-end-6">
          <AlarmClockWidget />
        </div>
        <div className="col-span-4 row-start-6 row-end-10">
          <StudyTimerWidget />
        </div>
        <div className="col-span-2 row-start-10 row-end-12">
          <ThemeSwitcherWidget />
        </div>
        <div className="col-span-2 row-start-10 row-end-12">
          <LightControlWidget />
        </div>
        <div className="col-span-3 row-start-10 row-end-12">
          <ClockWidget />
        </div>
        <div className="col-span-5 row-start-10 row-end-12">
          <VolumeControlWidget />
        </div>
      </div>
    </motion.div>
  );
};

const ControlCenter = Object.assign(
  {},
  { Launcher: ControlCenterLauncher, Application: ControlCenterApplication }
);
export default ControlCenter;
