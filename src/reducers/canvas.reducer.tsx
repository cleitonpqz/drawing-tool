// Define all available tools
export type Tool = "pencil" | "eraser" | "textbox";

// Define the shape of the state
interface CanvasState {
  tool: Tool;
  color: string;
  isDrawing: boolean;
  context: CanvasRenderingContext2D | null;
  textPosition: { x: number; y: number } | null;
  modalOpen: boolean;
}

// Initial state with default values
export const initialState: CanvasState = {
  tool: "pencil",
  color: "black",
  isDrawing: false,
  context: null,
  textPosition: null,
  modalOpen: false,
};

// Define action types
type CanvasAction =
  | { type: "SET_TOOL"; tool: Tool }
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_DRAWING"; isDrawing: boolean }
  | { type: "SET_CONTEXT"; context: CanvasRenderingContext2D | null }
  | { type: "SET_TEXT_POSITION"; textPosition: { x: number; y: number } | null }
  | { type: "TOGGLE_MODAL" };

// Reducer function to handle state transitions
export const canvasReducer = (
  state: CanvasState,
  action: CanvasAction
): CanvasState => {
  switch (action.type) {
    case "SET_TOOL":
      return { ...state, tool: action.tool };
    case "SET_COLOR":
      return { ...state, color: action.color };
    case "SET_DRAWING":
      return { ...state, isDrawing: action.isDrawing };
    case "SET_CONTEXT":
      return { ...state, context: action.context };
    case "SET_TEXT_POSITION":
      return { ...state, textPosition: action.textPosition };
    case "TOGGLE_MODAL":
      return { ...state, modalOpen: !state.modalOpen };
    default:
      return state;
  }
};
