import type { BaseObject, Key } from "@/app/types";

export type GameRule = BaseObject & {
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};
