import type { BaseObject } from "./baseObject";

export type Box = BaseObject & {
  value?: string;
  group: string;
  color?: string;
};
