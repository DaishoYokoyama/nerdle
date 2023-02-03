import type { BaseObject } from "./BaseObject";

export type Box = BaseObject & {
  value?: string;
  group: string;
  color?: string;
};
