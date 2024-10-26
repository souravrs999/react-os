import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";

type ClockWidgetProps = HTMLAttributes<HTMLDivElement> & {};
const ClockWidget: FC<ClockWidgetProps> = ({ className, ...rest }) => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "bg-background w-full h-full p-4 rounded-2xl flex items-center justify-between border border-border/20",
        className
      )}
      {...rest}
    >
      <Clock className="mr-auto size-4" />
      <h3 className="text-3xl tracking-widest">{time}</h3>
    </div>
  );
};
export default ClockWidget;
