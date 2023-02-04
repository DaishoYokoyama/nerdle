import { Router } from "express";

import { evaluateRouter } from "./evaluate";
import { gamePlayRouter } from "./play";
import { ruleRouter } from "./rule";

export const router = Router();

router.use("/evaluate", evaluateRouter);
router.use("/rule", ruleRouter);
router.use("/play", gamePlayRouter);
