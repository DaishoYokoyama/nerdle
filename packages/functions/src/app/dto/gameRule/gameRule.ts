import type { Key } from "./key";
import type { BaseObject } from "../baseObject";

export type GameRule = BaseObject & {
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};
