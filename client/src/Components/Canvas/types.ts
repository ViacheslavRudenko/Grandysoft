export interface MyProps {
  history: [];
  crossPoint: [];
  isAnimated: boolean;
  count: Number;
  updateState: any;
}

export interface MyState {
  isDrawing: boolean;
  start: { x: number; y: number };
  end: { x: number; y: number };
}
