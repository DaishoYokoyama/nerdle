/***********************
 * 共通オブジェクト
 ***********************/

export type Key = {
  id: string;
  value: string;
  type: "number" | "operator";
  color?: string;
};

export type KeyWithOutId = Omit<Key, "id">;
