// ColorToolButton.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorToolButton from "./index";

describe("ColorToolButton Component", () => {
  const mockHandleColorChange = jest.fn();
  const colors = [
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the ColorToolButton with the correct current color", () => {
    render(
      <ColorToolButton
        color="black"
        handleColorChange={mockHandleColorChange}
      />
    );

    // Check that the color palette button is rendered with the correct icon
    const button = screen.getByRole("button", { name: /Color/i });
    expect(button).toBeInTheDocument();

    // Ensure the button icon reflects the selected color
    expect(button.querySelector("svg")).toHaveStyle("color: black");
  });

  test("toggles the color palette when the button is clicked", () => {
    render(
      <ColorToolButton
        color="black"
        handleColorChange={mockHandleColorChange}
      />
    );

    const button = screen.getByRole("button", { name: /Color/i });

    // Initial palette should not be visible
    expect(screen.queryByTestId("color-palette")).not.toBeInTheDocument();

    // Click to show palette
    fireEvent.click(button);
    expect(screen.getByTestId("color-palette")).toBeInTheDocument();

    // Click again to hide palette
    fireEvent.click(button);
    expect(screen.queryByTestId("color-palette")).not.toBeInTheDocument();
  });

  test("calls handleColorChange when a color is selected from the palette", () => {
    render(
      <ColorToolButton
        color="black"
        handleColorChange={mockHandleColorChange}
      />
    );

    const button = screen.getByRole("button", { name: /Color/i });

    // Click to show palette
    fireEvent.click(button);

    // Click on the 'red' color option
    const redColorOption = screen.getByTestId("color-option-red");
    fireEvent.click(redColorOption);

    // Ensure the color change handler is called with the correct color
    expect(mockHandleColorChange).toHaveBeenCalledWith("red");

    // The palette should close after color selection
    expect(screen.queryByTestId("color-palette")).not.toBeInTheDocument();
  });

  test("closes the palette when clicked outside of it", () => {
    render(
      <ColorToolButton
        color="black"
        handleColorChange={mockHandleColorChange}
      />
    );

    const button = screen.getByRole("button", { name: /Color/i });

    // Click to show the palette
    fireEvent.click(button);
    expect(screen.getByTestId("color-palette")).toBeInTheDocument();

    // Simulate a click outside of the palette
    fireEvent.mouseDown(document);

    // Palette should be closed after clicking outside
    expect(screen.queryByTestId("color-palette")).not.toBeInTheDocument();
  });
});
