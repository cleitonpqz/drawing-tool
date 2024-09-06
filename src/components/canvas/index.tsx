"use client";

import { canvasReducer, initialState } from "@/reducers/canvas.reducer";
import { useReducer, useEffect, useCallback } from "react";
import MenuTools from "../menu-tools";
import TextBox from "../modal";
import styles from "./index.module.css";
import useCanvas from "@/hooks/useCanvas";
import { restoreCanvas, saveCanvas } from "@/utils/canvasUtils";

const Canvas = () => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);
  const { tool, color, isDrawing, context, modalOpen, textPosition } = state;
  const canvasRef = useCanvas(color, tool);

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
        dispatch({ type: "SET_CONTEXT", context: ctx });
      }
    }
  }, [canvasRef, color]);

  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
    }
  }, [color, context]);

  useEffect(() => {
    if (context) {
      if (tool === "eraser") {
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 20;
      } else {
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 5;
        context.strokeStyle = color;
      }
    }
  }, [tool, context, color]);

  const startDrawing = useCallback(
    (e: React.MouseEvent) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      dispatch({ type: "SET_DRAWING", isDrawing: true });
    },
    [canvasRef]
  );

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.closePath();
      dispatch({ type: "SET_DRAWING", isDrawing: false });
    }
  }, [canvasRef]);

  const openTextModal = (e: React.MouseEvent) => {
    if (tool === "textbox") {
      dispatch({
        type: "SET_TEXT_POSITION",
        textPosition: { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
      });
      dispatch({ type: "TOGGLE_MODAL" });
    }
  };

  const addText = useCallback(
    (text: string) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !textPosition) return;
      ctx.font = "20px Arial";
      ctx.fillStyle = color;
      ctx.fillText(text, textPosition.x, textPosition.y);
    },
    [canvasRef, textPosition, color]
  );

  const handleColorChange = (newColor: string) => {
    const savedImage = saveCanvas(canvasRef); // Save the current canvas content
    dispatch({ type: "SET_COLOR", color: newColor }); // Change color
    restoreCanvas(canvasRef, savedImage); // Restore the canvas content
  };

  return (
    <div className={styles.canvasContainer}>
      <MenuTools
        color={color}
        handleColorChange={handleColorChange}
        setTool={(tool) => dispatch({ type: "SET_TOOL", tool })}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={tool === "textbox" ? openTextModal : startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: "1px solid #000",
          cursor: "crosshair",
          width: "100%",
          height: "100%",
        }}
      />
      <TextBox
        isOpen={modalOpen}
        onClose={() => dispatch({ type: "TOGGLE_MODAL" })}
        onSubmit={addText}
      />
    </div>
  );
};

export default Canvas;
