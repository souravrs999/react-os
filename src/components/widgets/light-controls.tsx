import { cn } from "@/lib/utils";
import { Lightbulb, MoveUpRight } from "lucide-react";
import { FC, HTMLAttributes } from "react";

type LightControlWidgetProps = HTMLAttributes<HTMLDivElement> & {};
const LightControlWidget: FC<LightControlWidgetProps> = ({
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-yellow-300 w-full h-full p-1 rounded-2xl text-black",
        className
      )}
      {...rest}
    >
      <div className="flex w-full justify-between items-center">
        <Lightbulb />
        <span className="size-10 p-1 rounded-full bg-black text-white grid place-items-center">
          <MoveUpRight />
        </span>
      </div>
      <p className="text-sm font-semibold mb-2 ml-2">Lights</p>
    </div>
  );
};
export default LightControlWidget;
