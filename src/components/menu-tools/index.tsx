import { Eraser, Palette, Pencil, Type } from "lucide-react";
import ToolButton from "./tool-button";
import styles from "./MenuTools.module.css";
import ColorToolButton from "./color-tool-button";
import { Tool } from "@/reducers/canvas.reducer";

interface MenuToolsProps {
  color: string; // The currently selected color
  handleColorChange: (color: string) => void; // Function to set the selected color
  setTool: (tool: Tool) => void; // Function to set the selected tool
}

const MenuTools: React.FC<MenuToolsProps> = ({
  color,
  handleColorChange,
  setTool,
}) => (
  <div className={styles.controls}>
    <ToolButton
      icon={<Pencil />}
      onClick={() => setTool("pencil")}
      label="pencil"
    />
    <ToolButton
      icon={<Eraser />}
      onClick={() => setTool("eraser")}
      label="eraser"
    />
    <ToolButton
      icon={<Type />}
      onClick={() => setTool("textbox")}
      label="textbox"
    />
    <ColorToolButton color={color} handleColorChange={handleColorChange} />
  </div>
);

export default MenuTools;
