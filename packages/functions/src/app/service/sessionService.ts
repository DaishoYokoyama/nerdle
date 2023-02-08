import { v4 as uuid } from "uuid";

import { RuleDatabase } from "../db/rule";
import { notFoundException } from "../error";

import type { Session, Box, Rule } from "../domain";

export class SessionService {
  private _ruleDb: RuleDatabase;

  constructor() {
    this._ruleDb = new RuleDatabase();
  }

  /**
   * ゲームセッションの作成
   * @param ruleId
   * @throws {ReferenceError}
   * @returns {Session}
   */
  async createSession(ruleId?: string): Promise<Session> {
    let rule: Rule | undefined;

    if (ruleId) {
      rule = await this._ruleDb.get(ruleId);
    } else {
      rule = await this._ruleDb.getLatest();
    }

    if (!rule) {
      throw notFoundException("指定されたルールIDが見つかりません");
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
