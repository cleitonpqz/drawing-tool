import styles from "../MenuTools.module.css";

interface ToolButtonProps {
  icon: JSX.Element; // The icon passed to the button
  onClick: () => void; // The function to trigger when clicked
  label: string; // Label for the button
}

const ToolButton: React.FC<ToolButtonProps> = ({ icon, onClick, label }) => (
  <button className={styles.toolButton} onClick={onClick}>
    {icon} <span style={{ marginLeft: "8px" }}>{label}</span>
  </button>
);

export default ToolButton;
