import { evaluate } from "./evaluate";

/**
 * NOTE: 計算関数はmathjsを利用しているため、動作保証はmathjsに委ねる
 * https://mathjs.org/docs/expressions/parsing.html
 * (アプリ独自の挙動に関しては自前で動作確認を行う必要がある)
 */

describe("evaluate", () => {
  it("正常系の動作確認", () => {
    expect(evaluate("1 + 1")).toBe(2);
    expect(evaluate("2 + 3 * 5")).toBe(17);
    expect(evaluate("(2 + 3) * 5")).toBe(25);
  });

  it("異常系動作確認", () => {
    expect(() => evaluate("1 + 1 = 2")).toThrow();

    // NOTE: いずれ対応
    expect(() => evaluate("∫ x dx")).toThrow();
    expect(() => evaluate("15m")).toThrow();
    expect(() => evaluate("15000mm")).toThrow();
  });
});
