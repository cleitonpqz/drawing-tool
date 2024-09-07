// ToolButton.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToolButton from "./index";

describe("ToolButton Component", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the ToolButton with the correct icon and label", () => {
    const mockIcon = <span data-testid="mock-icon">Icon</span>;
    render(
      <ToolButton icon={mockIcon} onClick={mockOnClick} label="Test Label" />
    );

    // Check that the icon is rendered
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

    // Check that the label is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const mockIcon = <span data-testid="mock-icon">Icon</span>;
    render(
      <ToolButton icon={mockIcon} onClick={mockOnClick} label="Test Label" />
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("renders the label with the correct spacing", () => {
    const mockIcon = <span data-testid="mock-icon">Icon</span>;
    render(
      <ToolButton icon={mockIcon} onClick={mockOnClick} label="Test Label" />
    );

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();

    // Check if the label has the correct margin-left style
    expect(labelElement).toHaveStyle("margin-left: 8px");
  });
});
