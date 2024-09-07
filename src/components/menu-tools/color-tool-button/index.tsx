import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ToolButton from "../tool-button";
import styles from "../MenuTools.module.css";

interface ColorToolButtonProps {
  color: string; // The currently selected color
  handleColorChange: (color: string) => void; // Function to set the selected color
}

const ColorToolButton: React.FC<ColorToolButtonProps> = ({
  color,
  handleColorChange,
}) => {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  // List of color options
  const colors = [
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
  ];

  // Close palette if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setShowPalette(false);
      }
    };

    if (showPalette) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPalette]);

  const handleColorSelect = (selectedColor: string) => {
    handleColorChange(selectedColor);
    setShowPalette(false);
  };

  return (
    <div className={styles.colorTool} ref={paletteRef}>
      <ToolButton
        icon={<Palette style={{ color }} />}
        onClick={() => setShowPalette(!showPalette)}
        label="Color"
      />
      {showPalette && (
        <div className={styles.colorDropdown} data-testid="color-palette">
          {colors.map((col) => (
            <div
              key={col}
              data-testid={`color-option-${col}`}
              className={styles.colorOption}
              style={{ backgroundColor: col }}
              onClick={() => handleColorSelect(col)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorToolButton;
