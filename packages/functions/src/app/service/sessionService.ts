import { v4 as uuid } from "uuid";

import { RuleDatabase } from "../db/rule";

import type { Session, Box, Rule } from "../domain";

export class SessionService {
  private _ruleDb: RuleDatabase;

  constructor() {
    this._ruleDb = new RuleDatabase();
  }

  /**
   * ゲームセッションの作成
   * @param ruleId
   * @throws {Error}
   * @returns {Session}
   */
  async createSession(ruleId?: string): Promise<Session> {
    let rule: Rule | undefined;

    if (ruleId) {
      rule = await this._ruleDb.get(ruleId);
    } else {
      const rules = await this._ruleDb.getAll();
      rule = rules[0];
    }

    if (!rule) {
      throw new Error("Could not find the specified rule");
    }

    const correctValue = rule.correctValue;
    const boxes = Array.from({ length: rule.attemptLimits }).flatMap((_, i) => {
      const attempt = String(i + 1);
      return correctValue.map<Box>(() => ({
        id: uuid(),
        group: attempt,
      }));
    });

    const session: Session = {
      id: uuid(),
      ruleId: rule.id,
      attempt: 1,
      attemptLimits: rule.attemptLimits,
      correctValueLength: correctValue.length,
      boxes,
      keys: rule.keys,
    };

    return session;
  }
}
