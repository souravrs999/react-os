import { IWindow } from "@/store/slices/window";
import { FC, forwardRef, HTMLAttributes, memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import { useRootStore } from "@/store";
import withWindowPreviews from "@/hoc/with-window-preview";
import { CommandItem } from "../ui/command";

const MESSENGER_ICON = "/assets/icons/icon-imessage.png";
const MESSENGER_CONFIG: Partial<IWindow> = {
  id: "messenger",
  class: "application__messenger",
  name: "messenger",
  title: "Messenger",
  type: "application",
  icon: MESSENGER_ICON,
  x: 20,
  y: 20,
  width: 800,
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

const useMessengerWindow = () => {
  const {
    removeFromActiveWindows,
    addToActiveWindows,
    updateWindowCoordinates,
    maximizeWindow,
    minimizeWindow,
  } = useRootStore((state) => state);

  const addMessengerToWindowStack = () => {
    addToActiveWindows({
      ...MESSENGER_CONFIG,
      component: <Messenger.Application />,
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

  return { addMessengerToWindowStack };
};

type MessengerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  onClick: () => void;
};
const MessengerLauncher = memo(
  forwardRef<HTMLDivElement, MessengerLauncherProps>(
    ({ size = 30, onClick, ...props }, ref) => (
      <div ref={ref} onClick={onClick} {...props}>
        <Image
          src={MESSENGER_ICON}
          width={size}
          height={size}
          alt="icon-messenger"
        />
      </div>
    )
  )
);
MessengerLauncher.displayName = "MessengerLauncher";

type SpotlightMessengerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const SpotlightMessengerLauncher: FC<SpotlightMessengerLauncherProps> = ({
  size = 30,
}) => {
  const { toggleSpotlight } = useRootStore((state) => state);
  const { addMessengerToWindowStack } = useMessengerWindow();

  return (
    <CommandItem
      className="gap-2"
      onSelect={() => {
        addMessengerToWindowStack();
        toggleSpotlight(false);
      }}
    >
      <MessengerLauncher size={size} onClick={addMessengerToWindowStack} />
      Messenger
    </CommandItem>
  );
};

type DockMessengerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const DockMessengerLauncher: FC<DockMessengerLauncherProps> = ({
  size = 100,
}) => {
  const { addMessengerToWindowStack } = useMessengerWindow();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MessengerLauncher size={size} onClick={addMessengerToWindowStack} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Messenger</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type MessengerApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const MessengerApplication: FC<MessengerApplicationProps> = memo(() => (
  <div className="w-full h-full grid place-items-center bg-background">
    <h1 className="text-7xl font-bold">Messenger</h1>
  </div>
));
MessengerApplication.displayName = "MessengerApplication";

const Messenger = Object.assign(
  {},
  {
    Launcher: {
      Dock: withWindowPreviews(DockMessengerLauncher, "messenger"),
      Spotlight: SpotlightMessengerLauncher,
    },
    Application: MessengerApplication,
  }
);
export default Messenger;
