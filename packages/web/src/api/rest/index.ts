import { nanoid } from "nanoid";

import type { GameRule } from "@/types";

/**
 * ゲームの設定情報を取得する
 *
 * 【設定情報について】
 *  - attemptLimits: 何回まで間違えられるか
 *  - keys: 入力可能なキーの一覧
 * @returns
 */
export const getGameConfig = (): Promise<GameRule> => {
  return Promise.resolve<GameRule>({
    correctValueLength: 8,
    attemptLimits: 6,
    keys: [
      { id: nanoid(), value: "1", type: "number" },
      { id: nanoid(), value: "2", type: "number" },
      { id: nanoid(), value: "3", type: "number" },
      { id: nanoid(), value: "4", type: "number" },
      { id: nanoid(), value: "5", type: "number" },
      { id: nanoid(), value: "6", type: "number" },
      { id: nanoid(), value: "7", type: "number" },
      { id: nanoid(), value: "8", type: "number" },
      { id: nanoid(), value: "9", type: "number" },
      { id: nanoid(), value: "0", type: "number" },
      { id: nanoid(), value: "+", type: "operator" },
      { id: nanoid(), value: "-", type: "operator" },
      { id: nanoid(), value: "*", type: "operator" },
      { id: nanoid(), value: "/", type: "operator" },
      { id: nanoid(), value: "=", type: "operator" },
    ],
  });
};
