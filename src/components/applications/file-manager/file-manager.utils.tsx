import { IWindow } from "@/store/slices/window";
import { HTMLAttributes, memo, forwardRef } from "react";
import Image from "next/image";

export const FILE_MANAGER_ICON = "/assets/icons/icon-finder.png";
export const FILE_MANAGER_CONFIG: Partial<IWindow> = {
  id: "file-manager",
  class: "application__file-manager",
  name: "file-manager",
  title: "Files",
  type: "system",
  icon: FILE_MANAGER_ICON,
  x: 20,
  y: 20,
  width: 900,
  height: 700,
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

type FileManagerLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  onClick: () => void;
};
const FileManagerLauncher = memo(
  forwardRef<HTMLDivElement, FileManagerLauncherProps>(
    ({ size = 30, onClick, ...props }, ref) => (
      <div ref={ref} onClick={onClick} {...props}>
        <Image
          src={FILE_MANAGER_ICON}
          width={size}
          height={size}
          alt="icon-file-manager"
        />
      </div>
    )
  )
);
FileManagerLauncher.displayName = "FileManagerLauncher";
export default FileManagerLauncher;
