"use client";
import useWindowPreview from "@/hooks/use-window-preview";
import { cn, getViewportDimensions } from "@/lib/utils";
import { useRootStore } from "@/store";
import { IWindow } from "@/store/slices/window";
import { motion } from "framer-motion";
import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DraggableData, Rnd } from "react-rnd";

const GLOBAL_DRAG_HANDLE_CLASSNAME: string = "window__drag__handle";

export interface WindowTitleBarProps {
  title?: string;
  show?: boolean;
  actionItems?: {
    showMinimize: boolean;
    showMaximize: boolean;
    showClose: boolean;
  };
}

export interface WindowStateProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowProps extends IWindow {
  children: ReactNode;
}
const Window: FC<WindowProps> = (props) => {
  const { showTitleBar, resizable, children } = props;
  const {
    dock: { height: dockHeight },
    setWindowPreview,
    currMaxZIdx,
  } = useRootStore((state) => state);

  const [windowState, setWindowState] = useState<IWindow>({
    ...props,
  });
  const windowRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewUrl = useWindowPreview(previewRef);

  const handleDragStop = useCallback(
    (e: unknown, d: DraggableData) => {
      setWindowState((prevState) => ({
        ...prevState,
        x: d.x,
        y: d.y,
      }));
      windowState.onWindowDragStop?.(windowState, d);
    },
    [windowState]
  );

  const handleResizeStop = useCallback(
    (
      e: unknown,
      direction: string,
      ref: HTMLElement,
      delta: { width: number; height: number },
      position: { x: number; y: number }
    ) => {
      setWindowState((prevState) => ({
        ...prevState,
        width: Number(ref.style.width),
        height: Number(ref.style.height),
        x: position.x,
        y: position.y,
      }));
    },
    []
  );

  const handleWindowFocus = useCallback(() => {
    setWindowState((prevState) => ({
      ...prevState,
      zIndex: currMaxZIdx + 1,
    }));
    windowState.onWindowFocus?.(windowState);
  }, [windowState, currMaxZIdx]);

  useEffect(() => {
    if (props.generatePreview) {
      setWindowPreview(props, {
        id: props.id,
        name: props.name,
        url: previewUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(e.target as Node) &&
        windowState?.onWindowClickOutside
      ) {
        windowState.onWindowClickOutside(windowState);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [windowState]);

  return (
    <Rnd
      size={{ width: windowState.width, height: windowState.height }}
      position={{ x: windowState.x, y: windowState.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      dragHandleClassName={GLOBAL_DRAG_HANDLE_CLASSNAME}
      onMouseDown={handleWindowFocus}
      enableResizing={resizable}
      className={cn("pointer-events-auto will-change-transform")}
      style={{ zIndex: windowState.zIndex ?? 1 }}
    >
      <motion.div
        ref={windowRef}
        variants={{
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0 },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.3,
          type: "spring",
          damping: 20,
          stiffness: 120,
        }}
        className="flex flex-col h-full w-full rounded-xl overflow-hidden bg-background/20 dark:bg-background/50 backdrop-blur-2xl border border-border/20"
      >
        <div
          className={cn(
            "flex items-center justify-between p-2 cursor-move",

            GLOBAL_DRAG_HANDLE_CLASSNAME,
            {
              hidden: !showTitleBar,
            }
          )}
        >
          <div
            className={cn(
              "inline-flex gap-2 [&_button]:size-3 [&_button]:rounded-full"
            )}
          >
            <button
              onClick={() => {
                if (windowState?.onWindowMaximize) {
                  setWindowState({
                    ...windowState,
                    maximized: true,
                    minimized: false,
                    width: getViewportDimensions().width - 8,
                    height: getViewportDimensions().height - dockHeight,
                    x: 0,
                    y: 0,
                  });
                  windowState.onWindowMaximize(windowState);
                }
              }}
              className="bg-green-500"
            />
            <button
              onClick={() => {
                if (windowState?.onWindowMinimize) {
                  setWindowState({
                    ...windowState,
                    minimized: true,
                    maximized: false,
                  });
                  windowState.onWindowMinimize(windowState);
                }
              }}
              className="bg-yellow-500"
            />
            <button
              onClick={() => {
                if (windowState?.onWindowClose) {
                  windowState.onWindowClose(windowState);
                }
              }}
              className="bg-red-500"
            />
          </div>
          {/* <p className="font-bold text-sm">{windowState.title}</p>
          <span /> */}
        </div>
        <div ref={previewRef} className="flex-1 overflow-auto">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};
export default memo(Window);
