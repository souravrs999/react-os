import { useRootStore } from "@/store";
import { IWindow } from "@/store/slices/window";
import {
  HTMLAttributes,
  memo,
  forwardRef,
  FC,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { CommandItem } from "../ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import withWindowPreviews from "@/hoc/with-window-preview";
import useTerminal from "@/hooks/use-terminal";

const TERMINAL_EMULATOR_ICON = "/assets/icons/icon-terminal-emulator.png";
const TERMINAL_EMULATOR_CONFIG: Partial<IWindow> = {
  id: "terminal-emulator",
  class: "application__terminal-emulator",
  name: "terminal-emulator",
  title: "Terminal",
  type: "system",
  icon: TERMINAL_EMULATOR_ICON,
  x: 20,
  y: 20,
  width: 800,
  height: 600,
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

const useTerminalEmulatorWindow = () => {
  const {
    removeFromActiveWindows,
    addToActiveWindows,
    updateWindowCoordinates,
    maximizeWindow,
    minimizeWindow,
  } = useRootStore((state) => state);

  const addTerminalEmulatorToWindowStack = () => {
    addToActiveWindows({
      ...TERMINAL_EMULATOR_CONFIG,
      component: <TerminalEmulator.Application />,
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

  return { addTerminalEmulatorToWindowStack };
};

type TerminalEmulatorLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  onClick: () => void;
};
const TerminalEmulatorLauncher = memo(
  forwardRef<HTMLDivElement, TerminalEmulatorLauncherProps>(
    ({ size = 30, onClick, ...props }, ref) => (
      <div ref={ref} onClick={onClick} {...props}>
        <Image
          src={TERMINAL_EMULATOR_ICON}
          width={size}
          height={size}
          alt="icon-terminal-emulator"
        />
      </div>
    )
  )
);
TerminalEmulatorLauncher.displayName = "TerminalEmulatorLauncher";

type SpotlightTerminalEmulatorLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const SpotlightTerminalEmulatorLauncher: FC<
  SpotlightTerminalEmulatorLauncherProps
> = ({ size = 30 }) => {
  const { toggleSpotlight } = useRootStore((state) => state);
  const { addTerminalEmulatorToWindowStack } = useTerminalEmulatorWindow();

  return (
    <CommandItem
      className="gap-2"
      onSelect={() => {
        addTerminalEmulatorToWindowStack();
        toggleSpotlight(false);
      }}
    >
      <TerminalEmulatorLauncher
        size={size}
        onClick={addTerminalEmulatorToWindowStack}
      />
      Terminal
    </CommandItem>
  );
};

type DockTerminalEmulatorLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const DockTerminalEmulatorLauncher: FC<DockTerminalEmulatorLauncherProps> = ({
  size = 100,
}) => {
  const { addTerminalEmulatorToWindowStack } = useTerminalEmulatorWindow();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TerminalEmulatorLauncher
            size={size}
            onClick={addTerminalEmulatorToWindowStack}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Terminal</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type TerminalEmulatorApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const TerminalEmulatorApplication: FC<TerminalEmulatorApplicationProps> = memo(
  () => {
    const { history, setTerminalRef, pushToHistory, resetTerminal } =
      useTerminal();

    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = useCallback(() => inputRef.current?.focus(), []);

    useEffect(() => inputRef.current?.focus(), []);

    useEffect(() => {
      resetTerminal();
    }, []);

    return (
      <div className="border border-border/20 bg-background/20 backdrop-blur-md size-full overflow-auto scrollbar-thin">
        <div
          ref={setTerminalRef}
          onClick={focusInput}
          className="p-2 space-y-2"
        >
          {history.map((command, index) => (
            <div key={index}>{command}</div>
          ))}
          <div className="flex items-start gap-2">
            <span className="font-bold">$</span>
            <input
              ref={inputRef}
              className="bg-transparent w-full outline-none border-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  pushToHistory(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);
TerminalEmulatorApplication.displayName = "TerminalEmulatorApplication";

const TerminalEmulator = Object.assign(
  {},
  {
    Launcher: {
      Dock: withWindowPreviews(
        DockTerminalEmulatorLauncher,
        "terminal-emulator"
      ),
      Spotlight: SpotlightTerminalEmulatorLauncher,
    },
    Application: TerminalEmulatorApplication,
  }
);
export default TerminalEmulator;
