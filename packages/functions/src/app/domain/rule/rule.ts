import type { DataAccessObject } from "../dao";
import type { CreateKeyInput, Key } from "../key";

/***********************
 * DataAccessObject
 ***********************/

export type Rule = DataAccessObject & {
  correctValue: string[];
  attemptLimits: number;
  keys: Key[];
};

/***********************
 * REST入出力
 ***********************/

export type FindRuleResponse = Rule;

export type FindAllRuleResponse = Rule[];

export type CreateRuleInput = {
  correctValue: string[];
  attemptLimits: number;
  keys: CreateKeyInput[];
};

export type CreateRuleResponse = Rule;
