import type { KeyWithOutId, Key } from "./key";

/***********************
 * 共通オブジェクト
 ***********************/

export type RuleSummary = {
  id: string;
  correctValueLength: number;
  attemptLimits: number;
  keys: Key[];
};

export type Rule = {
  id: string;
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};

/***********************
 * REST入出力
 ***********************/

export type FindRuleResponse = Rule;

export type FindAllRuleResponse = Rule[];

export type CreateRuleRequest = {
  correctValue: string[];
  attemptLimits: number;
  keys: KeyWithOutId[];
};

export type CreateRuleResponse = Rule;
