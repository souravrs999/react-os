import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, forwardRef, HTMLAttributes, Ref } from "react";

type WallpaperServiceProps = HTMLAttributes<HTMLDivElement> & {};
const WallpaperService: FC<WallpaperServiceProps> = forwardRef(
  (props: WallpaperServiceProps, ref: Ref<HTMLDivElement>) => {
    const { className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn("relative w-full h-full overflow-hidden", className)}
        {...rest}
      >
        <Image
          alt="wallpaper"
          fill
          src="/assets/wallpapers/macos-monterey-wwdc-21-stock-dark-mode-5k-3840x2160-5585.jpg"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }
);
WallpaperService.displayName = "WallpaperService";
export default WallpaperService;
