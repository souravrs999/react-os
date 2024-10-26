import { useState, useEffect, useCallback, RefObject } from "react";
import html2canvas from "html2canvas";

const useWindowPreview = (ref: RefObject<HTMLElement>): string | null => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const generateDataUrl = useCallback(async () => {
    if (ref.current) {
      try {
        const canvas = await html2canvas(ref.current, {
          backgroundColor: null,
        });
        const url = canvas.toDataURL("image/png");
        setDataUrl(url);
      } catch (error) {
        console.error("Error generating image data URL:", error);
      }
    }
  }, [ref]);

  useEffect(() => {
    generateDataUrl();
  }, [generateDataUrl]);

  return dataUrl;
};

export default useWindowPreview;
