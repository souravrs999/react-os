import { IWindow } from "@/store/slices/window";
import { HTMLAttributes, memo, forwardRef } from "react";
import Image from "next/image";
import withWindowPreviews from "@/hoc/with-window-preview";

export const SETTINGS_ICON = "/assets/icons/icon-settings.png";
export const SETTINGS_CONFIG: Partial<IWindow> = {
  id: "settings",
  class: "application__settings",
  name: "settings",
  title: "Files",
  type: "system",
  icon: SETTINGS_ICON,
  x: 20,
  y: 20,
  width: 900,
  height: 700,
  resizable: true,
  draggable: true,
  showTitleBar: false,
  showMinimize: true,
  showMaximize: true,
  showClose: true,
  dragAxis: "both",
  visibility: "visible",
  generatePreview: true,
};

type SettingsLauncherProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  onClick: () => void;
};
const SettingsLauncher = memo(
  forwardRef<HTMLDivElement, SettingsLauncherProps>(
    ({ size = 30, onClick, ...props }, ref) => (
      <div ref={ref} onClick={onClick} {...props}>
        <Image
          src={SETTINGS_ICON}
          width={size}
          height={size}
          alt="icon-settings"
        />
      </div>
    )
  )
);
SettingsLauncher.displayName = "SettingsLauncher";
export default withWindowPreviews(SettingsLauncher, "settings");
