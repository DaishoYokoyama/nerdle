import { checkSchema } from "express-validator";

export const validateExecuteGuessRequest = checkSchema({
  ruleId: {
    in: ["body"],
    isString: true,
    isUUID: true,
  },
  boxes: {
    in: ["body"],
    isArray: true,
    isLength: {
      options: { min: 3 },
    },
  },
});
