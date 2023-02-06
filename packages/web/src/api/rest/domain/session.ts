import type { Box } from "./box";
import type { Key } from "./key";

/***********************
 * 共通オブジェクト
 ***********************/

export type Session = {
  id: string;
  ruleId: string;
  attempt: number;
  attemptLimits: number;
  correctValueLength: number;
  boxes: Box[];
  keys: Key[];
};

/***********************
 * REST入出力
 ***********************/

export type CreateSessionRequest = {
  ruleId?: string;
};

export type CreateSessionResponse = Session;
