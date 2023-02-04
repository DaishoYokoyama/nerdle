import { Router } from "express";

import { evaluateRouter } from "./evaluate";

export const router = Router();

router.use("/evaluate", evaluateRouter);
