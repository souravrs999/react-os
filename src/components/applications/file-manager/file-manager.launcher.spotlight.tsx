import { CommandItem } from "@/components/ui/command";
import { useRootStore } from "@/store";
import { HTMLAttributes, FC } from "react";
import useFileManagerWindow from "./file-manager.hook";
import FileManagerLauncher from "./file-manager.utils";

type SpotlightFileManagerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};
const SpotlightFileManagerLauncher: FC<SpotlightFileManagerLauncherProps> = ({
  size = 30,
}) => {
  const { toggleSpotlight } = useRootStore((state) => state);
  const { addFileManagerToWindowStack } = useFileManagerWindow();

  return (
    <CommandItem
      className="gap-2"
      onSelect={() => {
        addFileManagerToWindowStack();
        toggleSpotlight(false);
      }}
    >
      <FileManagerLauncher size={size} onClick={addFileManagerToWindowStack} />
      Files
    </CommandItem>
  );
};
export default SpotlightFileManagerLauncher;
