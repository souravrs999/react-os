import { useCallback, useEffect, useState } from "react";

const useTerminal = () => {
  const [terminalRef, setDomNode] = useState<HTMLDivElement>();
  const setTerminalRef = useCallback(
    (node: HTMLDivElement) => setDomNode(node),
    []
  );
  const [history, setHistory] = useState<string[]>([]);

  const pushToHistory = useCallback((command: string) => {
    setHistory((commands) => [...commands, command]);
  }, []);

  const resetTerminal = useCallback(() => {
    setHistory([]);
  }, []);

  useEffect(() => {
    const windowResizeEvent = () => {
      if (terminalRef) {
        terminalRef.scrollTo({
          top: terminalRef.scrollHeight,
          behavior: "smooth",
        });
      }
    };
    window.addEventListener("resize", windowResizeEvent);
    return () => window.removeEventListener("resize", windowResizeEvent);
  }, [terminalRef]);

  useEffect(() => {
    if (terminalRef) {
      terminalRef.scrollTo({
        top: terminalRef.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, terminalRef]);

  return {
    history,
    terminalRef,
    setTerminalRef,
    pushToHistory,
    resetTerminal,
  };
};
export default useTerminal;
