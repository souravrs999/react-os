import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import { Progress } from "../ui/progress";
import { Volume2 } from "lucide-react";

type VolumeControlWidgetProps = HTMLAttributes<HTMLDivElement> & {};
const VolumeControlWidget: FC<VolumeControlWidgetProps> = ({
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "relative bg-background w-full h-full rounded-2xl px-4 py-5",
        className
      )}
      {...rest}
    >
      <Progress
        className="rounded-xl h-full [&_div]:bg-indigo-600 my-auto"
        value={60}
      />
      <Volume2 className="absolute top-1/2 -translate-y-1/2 left-8" />
      <span className="absolute top-1/2 -translate-y-1/2 right-8 text-lg font-medium">
        60%
      </span>
    </div>
  );
};
export default VolumeControlWidget;
