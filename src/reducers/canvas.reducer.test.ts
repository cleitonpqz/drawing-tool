// canvasReducer.test.ts
import { canvasReducer, initialState, Tool } from "./canvas.reducer";

describe("canvasReducer", () => {
  it("should set the tool correctly when SET_TOOL action is dispatched", () => {
    const action = { type: "SET_TOOL", tool: "eraser" as Tool };
    const newState = canvasReducer(initialState, action);
    expect(newState.tool).toBe("eraser");
  });

  it("should set the color correctly when SET_COLOR action is dispatched", () => {
    const action = { type: "SET_COLOR", color: "blue" };
    const newState = canvasReducer(initialState, action);
    expect(newState.color).toBe("blue");
  });

  it("should set isDrawing correctly when SET_DRAWING action is dispatched", () => {
    const action = { type: "SET_DRAWING", isDrawing: true };
    const newState = canvasReducer(initialState, action);
    expect(newState.isDrawing).toBe(true);
  });

  it("should set the context correctly when SET_CONTEXT action is dispatched", () => {
    const mockContext = {} as CanvasRenderingContext2D; // Mocked canvas context
    const action = { type: "SET_CONTEXT", context: mockContext };
    const newState = canvasReducer(initialState, action);
    expect(newState.context).toBe(mockContext);
  });

  it("should set textPosition correctly when SET_TEXT_POSITION action is dispatched", () => {
    const action = {
      type: "SET_TEXT_POSITION",
      textPosition: { x: 50, y: 100 },
    };
    const newState = canvasReducer(initialState, action);
    expect(newState.textPosition).toEqual({ x: 50, y: 100 });
  });

  it("should toggle modalOpen when TOGGLE_MODAL action is dispatched", () => {
    const action = { type: "TOGGLE_MODAL" };
    const newState = canvasReducer(initialState, action);
    expect(newState.modalOpen).toBe(true); // Initially it is false, so it should toggle to true

    const newStateAfterToggle = canvasReducer(newState, action);
    expect(newStateAfterToggle.modalOpen).toBe(false); // Toggle again, should go back to false
  });

  it("should return the same state for unknown action type", () => {
    const action = { type: "UNKNOWN_ACTION" } as any;
    const newState = canvasReducer(initialState, action);
    expect(newState).toBe(initialState); // Should not mutate the state
  });
});
