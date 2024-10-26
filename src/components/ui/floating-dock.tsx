"use client";
import {
  useRef,
  forwardRef,
  createContext,
  useContext,
  HTMLAttributes,
  Ref,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 h-[70px] mx-auto flex w-max gap-2 rounded-2xl border p-2 backdrop-blur-md"
);

// Define the context with the props that need to be shared
interface DockContextType {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType | undefined>(undefined);

// DockIcon component that consumes DockContext
export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({
  size = 50,
  className,
  children,
  ...props
}: DockIconProps) => {
  const context = useContext(DockContext);
  const ref = useRef<HTMLDivElement>(null);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component.");
  }

  const { mouseX, magnification, distance } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = "DockIcon";

export type DockDividerProps = HTMLAttributes<HTMLDivElement>;
const DockDivider = forwardRef(
  (props: DockDividerProps, ref: Ref<HTMLDivElement>) => {
    const { className, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn("h-full w-[1px] bg-border/30 mx-1", className)}
        {...rest}
      ></div>
    );
  }
);
DockDivider.displayName = "DockDivider";

const Dock = forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          })}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);
Dock.displayName = "Dock";
export { Dock, DockIcon, DockDivider, dockVariants };
