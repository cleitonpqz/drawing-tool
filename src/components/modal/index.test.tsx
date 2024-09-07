// TextBox.test.tsx
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextBox from "./index";

describe("TextBox Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal when isOpen is true", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("does not render the modal when isOpen is false", () => {
    const { queryByTestId } = render(
      <TextBox isOpen={false} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    expect(queryByTestId("modal")).toBeNull();
  });

  test("focuses the input field when the modal is opened", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toHaveFocus();
  });

  test("calls onSubmit with the correct text when Save is clicked", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "Test input" } });
    fireEvent.click(screen.getByText("Save"));

    expect(mockOnSubmit).toHaveBeenCalledWith("Test input");
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("does not call onSubmit if input is empty", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("closes the modal when the Close button is clicked", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes the modal when the Escape key is pressed", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("does not close the modal when other keys are pressed", () => {
    render(
      <TextBox isOpen={true} onClose={mockOnClose} onSubmit={mockOnSubmit} />
    );

    fireEvent.keyDown(window, { key: "Enter", code: "Enter" });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
