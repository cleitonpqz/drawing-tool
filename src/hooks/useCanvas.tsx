import { useRef, useEffect, useCallback } from "react";

// Custom hook for managing the canvas
const useCanvas = (color: string, tool: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        contextRef.current = ctx;
      }
    }
  }, []);

  const updateCanvas = useCallback(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      if (tool === "eraser") {
        contextRef.current.globalCompositeOperation = "destination-out";
        contextRef.current.lineWidth = 20;
      } else {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.lineWidth = 5;
      }
    }
  }, [color, tool]);

  useEffect(() => {
    updateCanvas();
  }, [color, tool]);

  return canvasRef;
};

export default useCanvas;
