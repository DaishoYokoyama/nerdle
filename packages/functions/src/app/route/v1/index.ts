import { Router } from "express";

import { guessRouter } from "./guessRouter";
import { ruleRouter } from "./ruleRouter";
import { sessionRouter } from "./sessionRouter";

export const router = Router();

router.use("/rules", ruleRouter);
router.use("/session", sessionRouter);
router.use("/guess", guessRouter);
