import cloneDeep from "lodash.clonedeep";

import { badRequestException, notFoundException } from "../utils/error";
import { evaluate } from "../utils/evaluate";

import { RuleService } from "./ruleService";

import type { Box } from "../domain";

export class GuessService {
  private _ruleService: RuleService;

  constructor() {
    this._ruleService = new RuleService();
  }

  /**
   * 推測結果の正解判定
   * @param ruleId
   * @throws {ReferenceError | SyntaxError}
   * @param boxes
   */
  async executeGuess(ruleId: string, boxes: Box[]) {
    const rule = await this._ruleService.getRule(ruleId);

    if (!rule) {
      throw notFoundException("ルールが見つかりません");
    }

    if (rule.correctValue.length !== boxes.length) {
      throw badRequestException("ボックスの数が正しくありません");
    }

    if (boxes.filter((box) => box.value === "=").length !== 1) {
      throw badRequestException("式が不正です");
    }

    const expression = boxes.map((box) => box.value).join("");
    const [leftSideExpression, rightSideExpression] = expression.split("=");

    try {
      const leftSideValue = evaluate(leftSideExpression);
      const rightSideValue = evaluate(rightSideExpression);
      if (leftSideValue !== rightSideValue) throw Error();
    } catch {
      throw badRequestException("式が不正です");
    }

    /***************************************************
     * FIXME: Boxの色を変更するロジックをもう少しスマートに書く
     ***************************************************/
    const results = cloneDeep(boxes);

    const occurrences = rule.correctValue.reduce<Record<string, number>>(
      (acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      },
      {}
    );

    for (let i = 0; i < rule.correctValue.length; i++) {
      const correct = rule.correctValue[i];
      const guess = results[i];

      if (!guess.value) throw badRequestException("ボックスの値が不正です");

      if (guess.value === correct) {
        results[i].color = "green";
        occurrences[guess.value]--;
      } else if (!rule.correctValue.join("").includes(guess.value)) {
        results[i].color = "dark";
      }
    }

    for (let i = 0; i < results.length; i++) {
      const guess = results[i];
      if (guess.color || !guess.value) continue;

      if (occurrences[guess.value] > 0) {
        results[i].color = "violet";
        occurrences[guess.value]--;
      } else {
        results[i].color = "dark";
      }
    }

    return results;
  }
}
