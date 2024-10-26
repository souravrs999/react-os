import { useRootStore } from "@/store";
import { IWindow } from "@/store/slices/window";
import Image from "next/image";
import { CommandItem } from "../ui/command";
import { FC, forwardRef, HTMLAttributes, memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import withWindowPreviews from "@/hoc/with-window-preview";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { padWithZeroes } from "@/lib/utils";

const PERFORMANCE_MONITOR_ICON = "/assets/icons/icon-perfomance-monitor.png";
const PERFORMANCE_MONITOR_CONFIG: Partial<IWindow> = {
  id: "performance-monitor",
  class: "application__performance-monitor",
  name: "performance-monitor",
  title: "Performance Monitor",
  type: "system",
  icon: PERFORMANCE_MONITOR_ICON,
  x: 20,
  y: 20,
  width: 600,
  height: 800,
  resizable: true,
  draggable: true,
  showTitleBar: true,
  showMinimize: true,
  showMaximize: true,
  showClose: true,
  dragAxis: "both",
  visibility: "visible",
  generatePreview: true,
};

const monitorColumns: ColumnDef<IWindow>[] = [
  {
    accessorKey: "instanceCount",
    header: "PID",
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium">
        {padWithZeroes(row.original.instanceCount?.toString() || "0", 4)}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Process",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Image
          src={row.original.icon!}
          width={20}
          height={20}
          alt="icon-process"
        />
        <span>{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="uppercase text-muted-foreground font-medium">
        {row.original.type}
      </div>
    ),
  },
  { accessorKey: "", header: "Threads" },
];

const usePerformanceMonitorWindow = () => {
  const {
    removeFromActiveWindows,
    addToActiveWindows,
    updateWindowCoordinates,
    maximizeWindow,
    minimizeWindow,
  } = useRootStore((state) => state);

  const addPerformanceMonitorToWindowStack = () => {
    addToActiveWindows({
      ...PERFORMANCE_MONITOR_CONFIG,
      component: <PerformanceMonitor.Application />,
      open: false,
      minimized: false,
      maximized: false,
      close: false,
      onWindowClose: (window) => removeFromActiveWindows(window),
      onWindowDragStop: (window, data) =>
        updateWindowCoordinates(window, { x: data.x, y: data.y }),
      onWindowMaximize: (window) => maximizeWindow(window),
      onWindowMinimize: (window) => minimizeWindow(window),
    } as IWindow);
  };

  return { addPerformanceMonitorToWindowStack };
};

type PerformanceMonitorLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  onClick: () => void;
};
const PerformanceMonitorLauncher = memo(
  forwardRef<HTMLDivElement, PerformanceMonitorLauncherProps>(
    ({ size = 30, onClick, ...props }, ref) => (
      <div ref={ref} onClick={onClick} {...props}>
        <Image
          src={PERFORMANCE_MONITOR_ICON}
          width={size}
          height={size}
          alt="icon-performance-monitor"
        />
      </div>
    )
  )
);
PerformanceMonitorLauncher.displayName = "PerformanceMonitorLauncher";

type SpotlightPerformanceMonitorLauncherProps =
  HTMLAttributes<HTMLDivElement> & {
    size?: number;
  };
const SpotlightPerformanceMonitorLauncher: FC<
  SpotlightPerformanceMonitorLauncherProps
> = ({ size = 30 }) => {
  const { toggleSpotlight } = useRootStore((state) => state);
  const { addPerformanceMonitorToWindowStack } = usePerformanceMonitorWindow();

  return (
    <CommandItem
      className="gap-2"
      onSelect={() => {
        addPerformanceMonitorToWindowStack();
        toggleSpotlight(false);
      }}
    >
      <PerformanceMonitorLauncher
        size={size}
        onClick={addPerformanceMonitorToWindowStack}
      />
      Performance Monitor
    </CommandItem>
  );
};

type DockPerformanceMonitorLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const DockPerformanceMonitorLauncher: FC<
  DockPerformanceMonitorLauncherProps
> = ({ size = 100 }) => {
  const { addPerformanceMonitorToWindowStack } = usePerformanceMonitorWindow();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <PerformanceMonitorLauncher
            size={size}
            onClick={addPerformanceMonitorToWindowStack}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Perfomance Monitor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type PerformanceMonitorApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const PerformanceMonitorApplication: FC<PerformanceMonitorApplicationProps> =
  memo(() => {
    const { activeWindows } = useRootStore((state) => state);
    return (
      <div className="border border-border/20 bg-background/20 backdrop-blur-md size-full overflow-auto scrollbar-thin">
        <h4 className="px-4 py-2 font-bold text-sm">
          {activeWindows.length} Active Processes
        </h4>
        <div className="container [&_th]:h-8 [&_td]:py-2 [&_td]:px-4 [&_table]:text-xs [&_tr]:border-none [&>div]:border-none [&_td]:font-semibold">
          <DataTable columns={monitorColumns} data={activeWindows} />
        </div>
      </div>
    );
  });
PerformanceMonitorApplication.displayName = "PerformanceMonitorApplication";

const PerformanceMonitor = Object.assign(
  {},
  {
    Launcher: {
      Dock: withWindowPreviews(
        DockPerformanceMonitorLauncher,
        "performance-monitor"
      ),
      Spotlight: SpotlightPerformanceMonitorLauncher,
    },
    Application: PerformanceMonitorApplication,
  }
);
export default PerformanceMonitor;
