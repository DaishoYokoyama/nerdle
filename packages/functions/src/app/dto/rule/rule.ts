import type { Key } from "./key";
import type { BaseObject } from "../baseObject";

export type Rule = BaseObject & {
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};
