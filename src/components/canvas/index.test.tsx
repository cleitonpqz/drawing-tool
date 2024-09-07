import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Canvas from "./index";
import { saveCanvas, restoreCanvas } from "../../utils/canvasUtils";

// Mock canvas utilities
jest.mock("../../utils/canvasUtils", () => ({
  saveCanvas: jest.fn(),
  restoreCanvas: jest.fn(),
}));

describe("Canvas Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders canvas and menu tools correctly", () => {
    render(<Canvas />);

    // Check if the canvas is rendered
    const canvasElement = screen.getByTestId("drawing-canvas");
    expect(canvasElement).toBeInTheDocument();

    // Check if menu tools are rendered
    expect(screen.getByText(/pencil/i)).toBeInTheDocument();
    expect(screen.getByText(/eraser/i)).toBeInTheDocument();
    expect(screen.getByText(/textbox/i)).toBeInTheDocument();
  });

  test("text modal opens when clicking canvas with textbox tool", () => {
    render(<Canvas />);

    // Select the textbox tool
    fireEvent.click(screen.getByText(/textbox/i));

    // Click on canvas to open the text modal
    const canvasElement = screen.getByTestId("drawing-canvas");
    fireEvent.mouseDown(canvasElement);

    // Modal should open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("adds text to canvas when submitted in the modal", () => {
    render(<Canvas />);

    // Select the textbox tool and click on canvas to open the text modal
    fireEvent.click(screen.getByText(/textbox/i));
    const canvasElement = screen.getByTestId("drawing-canvas");
    fireEvent.mouseDown(canvasElement);

    // Type text into the modal and submit
    const input = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(input, { target: { value: "Test Text" } });
    fireEvent.click(screen.getByText(/save/i));

    // Ensure that the text is added to the canvas
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); // Modal should close
  });

  test("changing color saves and restores the canvas", () => {
    render(<Canvas />);

    // Change color
    const colorButton = screen.getByText(/color/i);
    fireEvent.click(colorButton);

    // Select a new color from the palette (e.g., red)
    const redOption = screen.getByTestId("color-option-red");
    fireEvent.click(redOption);

    // Check if the saveCanvas and restoreCanvas are called
    expect(saveCanvas).toHaveBeenCalled();
    expect(restoreCanvas).toHaveBeenCalled();
  });

  test("starts drawing on canvas mouse down and stops on mouse up", () => {
    render(<Canvas />);

    const canvasElement = screen.getByTestId("drawing-canvas");

    // Simulate starting drawing
    fireEvent.mouseDown(canvasElement, { clientX: 50, clientY: 50 });

    // Simulate drawing
    fireEvent.mouseMove(canvasElement, { clientX: 100, clientY: 100 });

    // Simulate stopping drawing
    fireEvent.mouseUp(canvasElement);
  });
});
