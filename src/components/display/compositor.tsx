import { FC, HTMLAttributes } from "react";
import WallpaperService from "./wallpaper";
import { cn } from "@/lib/utils";
import DisplayContextMenu from "./ context-menu";
import DisplayDock from "./dock";
import Spotlight from "./spotlight";

type CompositorProps = HTMLAttributes<HTMLDivElement> & {};
const Compositor: FC<CompositorProps> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cn("relative h-screen w-screen", className)} {...rest}>
      <div className="absolute h-screen w-screen z-0">
        <DisplayContextMenu>
          <WallpaperService />
        </DisplayContextMenu>
      </div>
      <div className="absolute h-screen w-screen z-10 pointer-events-none overflow-hidden">
        {children}
      </div>
      <Spotlight />
      <DisplayDock />
    </div>
  );
};
export default Compositor;
