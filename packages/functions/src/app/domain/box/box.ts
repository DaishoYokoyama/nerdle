import type { Color } from "../color";

/***********************
 * Data Transfer Object
 ***********************/

export type Box = {
  id: string;
  value?: string;
  group: string;
  color?: Color;
};
