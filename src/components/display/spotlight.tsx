"use client";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect } from "react";
import Messenger from "../applications/messenger";
import { ScanSearch } from "lucide-react";
import { useRootStore } from "@/store";
import PerformanceMonitor from "../applications/perfomance-monitor";
import TerminalEmulator from "../applications/terminal-emulator";
import SpotlightFileManagerLauncher from "../applications/file-manager/file-manager.launcher.spotlight";

const Spotlight = () => {
  const { spotlight, toggleSpotlight } = useRootStore((state) => state);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSpotlight(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={spotlight.open} onOpenChange={toggleSpotlight}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Applications">
          <Messenger.Launcher.Spotlight />
          <PerformanceMonitor.Launcher.Spotlight />
          <TerminalEmulator.Launcher.Spotlight />
          <SpotlightFileManagerLauncher />
        </CommandGroup>
        <CommandGroup heading="Commands">
          <CommandItem className="gap-2">
            <span className="bg-primary/20 backdrop-blur-lg p-1 rounded">
              <ScanSearch />
            </span>
            Open Spotlight
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
export default Spotlight;
