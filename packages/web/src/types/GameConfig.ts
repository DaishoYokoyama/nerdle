import type { Cell } from "./Cell";

export type GameConfig = {
  attemptLimits: number;
  cellCount: number;
  keys: Cell[];
};
