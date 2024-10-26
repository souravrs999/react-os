import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes, FC, memo } from "react";
import { SETTINGS_ICON } from "./settings.utils";

type MenuItemProps = HTMLAttributes<HTMLDivElement> & {
  img: string;
  name: string;
};
const MenuItem: FC<MenuItemProps> = ({ img, name, className, ...rest }) => {
  return (
    <div
      className={cn(
        "inline-flex gap-2 items-center px-2 py-1 hover:bg-background/40 rounded-md cursor-pointer",
        className
      )}
      {...rest}
    >
      <Image src={img} width={20} height={20} alt={name} />
      <h4 className="font-medium text-sm text-muted-foreground">{name}</h4>
    </div>
  );
};

type MenuSectionProps = HTMLAttributes<HTMLDivElement> & {};
const MenuSection: FC<MenuSectionProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex flex-col my-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full flex-1 scrollbar-track-rounded-full",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

type SettingsApplicationProps = HTMLAttributes<HTMLDivElement> & {};
const SettingsApplication: FC<SettingsApplicationProps> = memo(() => {
  return (
    <div className="size-full overflow-auto scrollbar-thin">
      <div className="grid grid-cols-12 size-full">
        <div className="col-span-3 border-r border-border/40 bg-background/40 p-2">
          <div className="flex flex-col h-full overflow-auto">
            <span className="w-full [&_button]:size-3 [&_button]:rounded-full inline-flex gap-1 p-2">
              <button className="bg-green-500" />
              <button className="bg-yellow-500" />
              <button className="bg-red-500" />
            </span>
            <MenuSection>
              <MenuItem img={"/assets/icons/icon-dock.png"} name="Dock" />
              <MenuItem img={SETTINGS_ICON} name="General" />
              <MenuItem
                img="/assets/icons/icon-tiles.png"
                name="Control Center"
              />
            </MenuSection>
          </div>
        </div>
        <div className="col-span-9 bg-background/80 p-4 space-y-4"></div>
      </div>
    </div>
  );
});
SettingsApplication.displayName = "SettingsApplication";
export default SettingsApplication;
