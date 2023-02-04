import { parse } from "mathjs";

export const evaluate = (expression: string): number => {
  // TODO: NodeTreeに変換後オリジナルの処理 (例えば mやmmを変換する処理)を追加する
  // TODO: 想定外の式を実行できないようにする

  try {
    const node = parse(expression);
    const code = node.compile();
    const result = code.evaluate();
    if (typeof result !== "number") throw new Error();
    return result;
  } catch {
    throw new Error("式の評価に失敗しました");
  }
};
