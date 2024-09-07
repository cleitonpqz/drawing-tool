import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuTools from "./index";
import { Tool } from "@/reducers/canvas.reducer";

describe("MenuTools Component", () => {
  const mockSetTool = jest.fn();
  const mockHandleColorChange = jest.fn();
  const color = "black";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders tool buttons correctly", () => {
    render(
      <MenuTools
        color={color}
        handleColorChange={mockHandleColorChange}
        setTool={mockSetTool}
      />
    );

    // Verify that all tool buttons are rendered
    expect(screen.getByText(/pencil/i)).toBeInTheDocument();
    expect(screen.getByText(/eraser/i)).toBeInTheDocument();
    expect(screen.getByText(/textbox/i)).toBeInTheDocument();
  });

  test("clicking pencil tool button triggers setTool with 'pencil'", () => {
    render(
      <MenuTools
        color={color}
        handleColorChange={mockHandleColorChange}
        setTool={mockSetTool}
      />
    );

    // Click the pencil button
    fireEvent.click(screen.getByText(/pencil/i));

    // Ensure the mockSetTool is called with 'pencil'
    expect(mockSetTool).toHaveBeenCalledWith("pencil");
  });

  test("clicking eraser tool button triggers setTool with 'eraser'", () => {
    render(
      <MenuTools
        color={color}
        handleColorChange={mockHandleColorChange}
        setTool={mockSetTool}
      />
    );

    // Click the eraser button
    fireEvent.click(screen.getByText(/eraser/i));

    // Ensure the mockSetTool is called with 'eraser'
    expect(mockSetTool).toHaveBeenCalledWith("eraser");
  });

  test("clicking textbox tool button triggers setTool with 'textbox'", () => {
    render(
      <MenuTools
        color={color}
        handleColorChange={mockHandleColorChange}
        setTool={mockSetTool}
      />
    );

    // Click the textbox button
    fireEvent.click(screen.getByText(/textbox/i));

    // Ensure the mockSetTool is called with 'textbox'
    expect(mockSetTool).toHaveBeenCalledWith("textbox");
  });

  test("clicking color tool button shows color palette and selects a color", () => {
    render(
      <MenuTools
        color={color}
        handleColorChange={mockHandleColorChange}
        setTool={mockSetTool}
      />
    );

    // Simulate clicking the color tool button (Palette icon)
    fireEvent.click(screen.getByText(/color/i));

    // Select a color from the palette (for example, blue)
    fireEvent.click(screen.getByTestId("color-option-blue"));

    // Ensure the handleColorChange is called with the selected color
    expect(mockHandleColorChange).toHaveBeenCalledWith("blue");
  });
});
