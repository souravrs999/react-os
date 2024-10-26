import { HTMLAttributes, FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SettingsLauncher from "./settings.utils";
import useSettingsWindow from "./settings.hook";

type DockSettingsLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const DockSettingsLauncher: FC<DockSettingsLauncherProps> = ({
  size = 100,
}) => {
  const { addSettingsToWindowStack } = useSettingsWindow();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SettingsLauncher size={size} onClick={addSettingsToWindowStack} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Files</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default DockSettingsLauncher;
