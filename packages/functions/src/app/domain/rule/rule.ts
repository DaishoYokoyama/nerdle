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

export type FindRuleResponse = RuleSummary;

export type FindAllRuleResponse = RuleSummary[];

export type CreateRuleRequest = {
  correctValue: string[];
  attemptLimits: number;
  keys: KeyWithOutId[];
};

export type CreateRuleResponse = Rule;
