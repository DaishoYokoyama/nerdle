import type { OperatorKey, Key, NumberKey } from "@/types";

export const isNumberKey = (key: Key): key is NumberKey =>
  key.type === "number";

export const isOperatorKey = (key: Key): key is OperatorKey =>
  key.type === "operator";
