// Save the current canvas state
export const saveCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>
): string | null => {
  const canvas = canvasRef.current;
  if (canvas) {
    return canvas.toDataURL(); // Save canvas as an image data URL
  }
  return null;
};

// Restore the saved canvas state
export const restoreCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  savedImage: string | null
) => {
  const canvas = canvasRef.current;
  if (canvas && savedImage) {
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = savedImage;
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
    };
  }
};
