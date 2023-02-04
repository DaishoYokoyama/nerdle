import { checkSchema } from "express-validator";

import type { Key } from "@/app/types";

export const gameRuleValidator = checkSchema({
  correctValue: {
    in: ["body"],
    isArray: true,
    isLength: {
      errorMessage: "correctValue must be an array of 3 to 11 strings",
      options: { min: 3, max: 11 },
    },
    custom: {
      errorMessage: `The characters that can be used for correctValue are as follows.\n ["0","1","2","3","4","5","6","7","8","9","+","-","*","/","="]`,
      options: (values: string[]) => {
        const enabledValues = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "+",
          "-",
          "*",
          "/",
          "=",
        ];
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
      options: (keys: Key[]) => {
        const equalKeyIndex = keys.findIndex((key) => key.value === "=");
        if (equalKeyIndex === -1) return false;

        return true;
      },
    },
  },
});
