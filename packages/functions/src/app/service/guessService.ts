import cloneDeep from "lodash.clonedeep";

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
   * @param boxes
   */
  async executeGuess(ruleId: string, boxes: Box[]) {
    const rule = await this._ruleService.getRule(ruleId);

    if (!rule) {
      throw new Error("ルールが見つかりません");
    }

    if (rule.correctValue.length !== boxes.length) {
      throw new Error("ボックスの数が正しくありません");
    }

    if (boxes.filter((box) => box.value === "=").length !== 1) {
      throw new Error("イコールキーが1つではありません");
    }

    const expression = boxes.map((box) => box.value).join("");
    const [leftSideExpression, rightSideExpression] = expression.split("=");

    try {
      const leftSideValue = evaluate(leftSideExpression);
      const rightSideValue = evaluate(rightSideExpression);
      if (leftSideValue !== rightSideValue) throw Error();
    } catch {
      throw new Error("不正な式です");
    }

    /***************************************************
     * FIXME: Boxの色を変更するロジックをもう少しスマートに書く
     ***************************************************/
    const results = cloneDeep(boxes);

    const correctValueClone = cloneDeep(rule.correctValue);
    const removeValue = (value: string) =>
      correctValueClone.splice(
        correctValueClone.findIndex((x) => x === value),
        1
      );

    // 正誤判定 & 色付け
    for (let i = 0; i < rule.correctValue.length; i++) {
      const correct = rule.correctValue[i];
      const guess = results[i];

      // NOTE: 前処理のバリデーションで下記条件は除外されているが、Typescriptの型補完のためチェック
      if (!guess.value) throw new Error("ボックスの値が不正です");

      if (guess.value === correct) {
        results[i].color = "green";
        removeValue(guess.value);
        continue;
      }

      if (!rule.correctValue.includes(guess.value)) {
        results[i].color = "dark";
        continue;
      }

      if (correctValueClone.includes(guess.value)) {
        results[i].color = "violet";
        removeValue(guess.value);
        continue;
      }
    }

    return results;
  }
}
