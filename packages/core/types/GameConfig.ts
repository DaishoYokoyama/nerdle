import type { Key } from "./key";

export type GameConfig = {
  correctValue: string[]; // TODO: 不正防止のため本来は箱の要素数を渡す
  attemptLimits: number;
  keys: Key[];
};
