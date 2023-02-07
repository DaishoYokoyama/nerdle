import { v4 as uuid } from "uuid";

import { RuleDatabase } from "../db/rule";

import type { KeyWithOutId } from "../domain";
import type { Rule, Key } from "../dto";

export class RuleService {
  private _ruleDb: RuleDatabase;

  constructor() {
    this._ruleDb = new RuleDatabase();
  }

  /**
   * ゲームルール追加
   * @param correctValue
   * @param attemptLimits
   * @param keys
   * @returns {Rule}
   */
  async addRule(
    correctValue: string[],
    attemptLimits: number,
    keys: KeyWithOutId[]
  ): Promise<Rule> {
    const createdAt = new Date().toISOString();

    const rule: Rule = {
      id: uuid(),
      correctValue,
      attemptLimits,
      createdAt,
      keys: keys.map<Key>((key) => ({
        id: uuid(),
        createdAt,
        ...key,
      })),
    };

    await this._ruleDb.set(rule);

    return rule;
  }

  /**
   * ゲームルール全件取得
   * @returns {Rule[]}
   */
  async getRules(): Promise<Rule[]> {
    return this._ruleDb.getAll();
  }

  /**
   * IDでゲームルール取得
   * @param ruleId
   * @returns {Rule | undefined}
   */
  async getRule(ruleId: string): Promise<Rule | undefined> {
    return this._ruleDb.get(ruleId);
  }
}
