import type { BaseObject } from "./baseObject";

export type Key = BaseObject & {
  value: string;
  type: "number" | "operator";
  color?: string;
};

export type NumberKey = Key & { type: "number" };
export type OperatorKey = Key & { type: "operator" };
