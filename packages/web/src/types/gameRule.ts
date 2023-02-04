import type { Key } from "./key";

export type GameRule = {
  correctValueLength: number;
  attemptLimits: number;
  keys: Key[];
};
