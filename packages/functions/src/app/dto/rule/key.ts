import type { BaseObject } from "../baseObject";

export type Key = BaseObject & {
  value: string;
  type: "number" | "operator";
  color?: string;
};
