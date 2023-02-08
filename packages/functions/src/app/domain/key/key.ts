import type { Color } from "../color";
import type { DataAccessObject } from "../dao";

/***********************
 * Data Access Object
 ***********************/

export type Key = DataAccessObject & {
  value: string;
  type: "number" | "operator";
  color?: Color;
};

/***********************
 * Data Transfer Object
 ***********************/

export type CreateKeyInput = Omit<Key, "id" | "createdAt">;
