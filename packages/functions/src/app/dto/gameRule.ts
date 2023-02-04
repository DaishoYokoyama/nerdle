import type { BaseObject, Key } from "@/../../core/types";

export type GameRule = BaseObject & {
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};
