"use client";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Wifi } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { Switch } from "../ui/switch";

export interface WifiWidgetProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}
const WifiWidget: FC<WifiWidgetProps> = (props) => {
  const { active, className, ...rest } = props;
  const [wifiActive, setWifiActive] = useState<boolean>(active || true);

  return (
    <div
      className={cn(
        "bg-background border border-border/20 p-4 rounded-2xl space-y-8 h-full",
        className
      )}
      {...rest}
    >
      <div className="flex gap-8 items-center justify-between">
        <span
          onClick={() => setWifiActive(!wifiActive)}
          className={cn(
            "size-10 bg-input grid place-items-center rounded-full cursor-pointer",
            {
              "bg-[#1F8bFF] text-white": wifiActive,
            }
          )}
        >
          <Wifi />
        </span>
        <span className="size-10 bg-input grid place-items-center rounded-full cursor-pointer">
          <ArrowUpRight />
        </span>
      </div>
      <div className="text-sm">
        <h4 className="font-semibold">WIFI</h4>
        <p className="text-muted-foreground text-xs">On - FFTH_wifi</p>
      </div>
      <div className="w-full flex justify-end">
        <Switch
          checked={wifiActive}
          onCheckedChange={() => setWifiActive(!wifiActive)}
        />
      </div>
    </div>
  );
};
export default WifiWidget;
