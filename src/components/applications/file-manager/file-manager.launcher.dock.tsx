import { HTMLAttributes, FC } from "react";
import useFileManagerWindow from "./file-manager.hook";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FileManagerLauncher from "./file-manager.utils";

type DockFileManagerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const DockFileManagerLauncher: FC<DockFileManagerLauncherProps> = ({
  size = 100,
}) => {
  const { addFileManagerToWindowStack } = useFileManagerWindow();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <FileManagerLauncher
            size={size}
            onClick={addFileManagerToWindowStack}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Files</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default DockFileManagerLauncher;
