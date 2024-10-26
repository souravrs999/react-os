import { cn } from "@/lib/utils";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FC, HTMLAttributes } from "react";

type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement>;
const ThemeSwitcherWidget: FC<ThemeSwitcherProps> = ({
  className,
  ...rest
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={cn(
        "bg-background border border-border/20 h-full w-full rounded-2xl p-4 cursor-pointer grid place-items-center space-y-2",
        className
      )}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      {...rest}
    >
      {theme === "dark" ? (
        <Sun className="size-8" />
      ) : (
        <MoonStar className="size-8" />
      )}
      <p className="text-xs text-muted-foreground">
        {theme === "dark" ? "Light" : "Dark"}
      </p>
    </div>
  );
};
export default ThemeSwitcherWidget;
