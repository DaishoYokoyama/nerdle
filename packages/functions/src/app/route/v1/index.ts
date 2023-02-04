import { Router } from "express";

import { evaluateRouter } from "./evaluate";
import { gamePlayRouter } from "./gamePlay";
import { gameRuleRouter } from "./gameRule";

export const router = Router();

router.use("/evaluate", evaluateRouter);
router.use("/gameRule", gameRuleRouter);
router.use("/gamePlay", gamePlayRouter);
