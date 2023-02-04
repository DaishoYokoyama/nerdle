import type { KeyWithOutId, Key } from "./key";

/***********************
 * 共通オブジェクト
 ***********************/

export type GameRuleSummary = {
  id: string;
  correctValueLength: number;
  attemptLimits: number;
  keys: Key[];
};

export type GameRule = {
  id: string;
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};

/***********************
 * REST入出力
 ***********************/

export type FindGameRuleResponse = GameRuleSummary;

export type FindAllGameRuleResponse = GameRuleSummary[];

export type CreateGameRuleRequest = {
  correctValue: string[];
  attemptLimits: number;
  keys: KeyWithOutId[];
};

export type CreateGameRuleResponse = GameRule;
