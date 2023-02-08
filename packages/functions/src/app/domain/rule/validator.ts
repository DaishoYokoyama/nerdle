import { checkSchema } from "express-validator";

import { evaluate } from "../../utils/evaluate";

import type { CreateKeyInput } from "../key";

/**
 * correctValueに使用できる文字列の配列
 */
const enabledValues = [
  ...Array.from({ length: 10 }, (_, i) => i.toString()),
  "+",
  "-",
  "*",
  "/",
  "=",
];

export const validateCreateGameRuleRequest = checkSchema({
  correctValue: {
    in: ["body"],
    isArray: true,
    isLength: {
      errorMessage: "correctValue must be an array of 3 to 11 strings",
      options: { min: 3, max: 11 },
    },
    custom: {
      errorMessage: `The characters that can be used for correctValue are as follows.\n ${JSON.stringify(
        enabledValues
      )}`,
      options: (values: string[]) => {
        return values.every((value) => enabledValues.includes(value));
      },
    },
  },
  attemptLimits: {
    in: ["body"],
    isInt: true,
    toInt: true,
    isLength: {
      errorMessage: "attemptLimits must be an integer between 3 and 6",
      options: { min: 3, max: 6 },
    },
  },
  keys: {
    in: ["body"],
    isArray: true,
    custom: {
      // FIXME: エラーの原因を詳細に伝える
      errorMessage: "validation error for keys",
      options: (keys: CreateKeyInput[]) => {
        const equalKey = keys.filter((key) => key.value === "=");
        if (equalKey.length !== 1) return false;

        const expression = keys.join(" ");
        const [leftSideExpression, rightSideExpression] = expression.split("=");

        try {
          const leftSideValue = evaluate(leftSideExpression);
          const rightSideValue = evaluate(rightSideExpression);
          return leftSideValue === rightSideValue;
        } catch {
          return false;
        }
      },
    },
  },
});

export const validateFindGameRuleRequest = checkSchema({
  id: {
    in: ["params"],
    isString: true,
    isUUID: true,
  },
});
