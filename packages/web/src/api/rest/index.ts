import { http } from "./client";

import type { FindGameRuleResponse } from "./domain";

/**
 * ゲームの設定情報を取得する
 *
 * 【設定情報について】
 *  - attemptLimits: 何回まで間違えられるか
 *  - keys: 入力可能なキーの一覧
 * @returns
 */
export const getGameConfig = (): Promise<FindGameRuleResponse> =>
  http.post<FindGameRuleResponse>("/gamePlay").then((res) => res.data);
