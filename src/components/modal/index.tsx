import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

interface TextBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ isOpen, onClose, onSubmit }) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus input when modal opens
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText.trim());
      setInputText("");
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="modal"
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className={styles.modalContent}>
        <h2 id="modalTitle" className={styles.modalTitle}>
          Enter Text
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            data-testid="modal-input"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text"
            className={styles.inputField}
            aria-label="Text input field"
          />
          <div className={styles.buttonContainer}>
            <button
              data-testid="modal-button-submit"
              type="submit"
              className={styles.submitButton}
            >
              Save
            </button>
            <button
              data-testid="modal-button-close"
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextBox;
