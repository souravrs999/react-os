import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ViewportDimensions {
  width: number;
  height: number;
}
export function getViewportDimensions(): ViewportDimensions {
  if (typeof window === "undefined") {
    return { width: 1920, height: 1080 };
  } else {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}

export function padWithZeroes(input: string, length: number) {
  return input.padStart(length, "0");
}
