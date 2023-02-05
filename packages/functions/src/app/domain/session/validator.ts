import { checkSchema } from "express-validator";

export const validateCreateSessionRequest = checkSchema({
  ruleId: {
    in: ["params"],
    isString: true,
    isUUID: true,
    optional: true,
  },
});
