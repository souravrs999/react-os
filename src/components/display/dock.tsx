"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, FC, useRef, useEffect } from "react";
import { Dock, DockDivider, DockIcon } from "../ui/floating-dock";
import DockNotification from "../notifications/dock-notification";
import Image from "next/image";
import ControlCenter from "../applications/control-center";
import Messenger from "../applications/messenger";
import { useRootStore } from "@/store";
import PerfomanceMonitor from "../applications/perfomance-monitor";
import TerminalEmulator from "../applications/terminal-emulator";
import DockFileManagerLauncher from "../applications/file-manager/file-manager.launcher.dock";
import DockSettingsLauncher from "../applications/settings/settings.launcher.dock";

type DisplayDockProps = HTMLAttributes<HTMLDivElement> & {};
const DisplayDock: FC<DisplayDockProps> = (props) => {
  const { className, ...rest } = props;
  const dockRef = useRef<HTMLDivElement>(null);
  const { setDockDimensions } = useRootStore((state) => state);

  useEffect(() => {
    const dock = dockRef.current;
    if (dock) {
      setDockDimensions(dock.offsetWidth, dock.offsetHeight);
    }

    const dockResizeObserver = new ResizeObserver(() => {
      if (dock) {
        setDockDimensions(dock.offsetWidth, dock.offsetHeight);
      }
    });

    if (dock) {
      dockResizeObserver.observe(dock);
    }

    return () => {
      if (dock) {
        dockResizeObserver.unobserve(dock);
      }
    };
  }, []);

  return (
    <div
      ref={dockRef}
      className={cn("absolute bottom-0 w-full p-2 z-10", className)}
      {...rest}
    >
      <Dock className="border border-border/20 bg-background/20 backdrop-blur-2xl">
        <DockIcon>
          <DockFileManagerLauncher />
        </DockIcon>
        <DockIcon>
          <Image
            src="/assets/icons/icon-app-store.png"
            width={100}
            height={100}
            alt="icon-app-store"
          />
        </DockIcon>
        <DockIcon>
          <Messenger.Launcher.Dock />
        </DockIcon>
        <DockIcon>
          <PerfomanceMonitor.Launcher.Dock />
        </DockIcon>
        <DockIcon>
          <DockSettingsLauncher />
        </DockIcon>
        <DockIcon>
          <TerminalEmulator.Launcher.Dock />
        </DockIcon>
        <DockNotification />
        <DockDivider />
        <DockIcon>
          <ControlCenter.Launcher />
        </DockIcon>
      </Dock>
    </div>
  );
};
export default DisplayDock;
