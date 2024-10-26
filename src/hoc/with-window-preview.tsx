import { cn } from "@/lib/utils";
import { useRootStore } from "@/store";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentType, FC, HTMLAttributes, useState } from "react";
import { X } from "lucide-react";

export const MAX_WINDOW_PREVIEW_COUNT = 3;
type WindowPreviewProps = HTMLAttributes<HTMLDivElement> & {};

const withWindowPreviews = <T extends object>(
  WrappedComponent: ComponentType<T>,
  id: string
) => {
  const WindowPreview: FC<T & WindowPreviewProps> = ({
    className,
    ...rest
  }) => {
    const { activeWindows, dock } = useRootStore((state) => state);
    const activeWindowPreviews = activeWindows.filter(
      (window) => window.id === id
    );

    const [visible, setVisible] = useState<boolean>(false);
    const { removeFromActiveWindows, restoreMinimizedWindow } = useRootStore(
      (state) => state
    );

    return (
      <div
        className={cn("relative pointer-events-auto", className)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <WrappedComponent {...(rest as T)} />
        {/* Preview indicators */}
        <div className="absolute flex gap-1 items-center left-1/2 -translate-x-1/2">
          {activeWindowPreviews
            .slice(0, MAX_WINDOW_PREVIEW_COUNT)
            .map((window) => (
              <span
                key={`${window.id}-${window.instanceCount}`}
                className="size-1 bg-primary/50 rounded-full"
              />
            ))}
        </div>
        {/* Preview Tooltip */}
        <AnimatePresence>
          {visible && activeWindowPreviews.length > 0 && (
            <motion.div
              className="absolute flex bg-background/20 border border-border/20 left-1/2 -translate-x-1/2 rounded-2xl p-2 gap-2 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                bottom: `${dock.height - 10}px`,
                width: "max-content",
                translateX: "-50%",
              }}
            >
              {activeWindowPreviews
                .slice(0, MAX_WINDOW_PREVIEW_COUNT)
                .map((window) => (
                  <div
                    key={`${window.id}-${window.instanceCount}`}
                    onClick={() => restoreMinimizedWindow(window)}
                    className="flex flex-col gap-1 items-center w-40 justify-center h-32"
                  >
                    <p className="text-xs">{window.title}</p>
                    <div className="relative group size-full">
                      <div className="relative size-full rounded-xl overflow-hidden border border-border/20 bg-background">
                        {window.preview?.url ? (
                          <Image
                            src={window.preview?.url || ""}
                            alt="window preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="grid place-items-center w-full h-full">
                            <Image
                              src={window.icon!}
                              alt="icon"
                              width={50}
                              height={50}
                            />
                          </div>
                        )}
                      </div>
                      <span
                        onClick={() => removeFromActiveWindows(window)}
                        className="absolute -top-1 -right-1 size-4 bg-orange-500 rounded-full grid place-items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <X className="size-3" />
                      </span>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  return WindowPreview;
};
export default withWindowPreviews;
