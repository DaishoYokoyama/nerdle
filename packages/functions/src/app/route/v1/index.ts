import { Router } from "express";

import { evaluateRouter } from "./evaluate";
import { gameRuleRouter } from "./gameRule";

export const router = Router();

router.use("/evaluate", evaluateRouter);
router.use("/gameRule", gameRuleRouter);
