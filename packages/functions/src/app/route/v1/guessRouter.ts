import { Router } from "express";

import { validateExecuteGuessRequest } from "../../domain";
import { GuessService } from "../../service";

import type { ExecuteGuessRequest, ExecuteGuessResponse } from "../../domain";
import type { Request, Response } from "express";

export const guessRouter = Router();

/**
 * POST /api/v1/guess
 * @returns {ExecuteGuessResponse}
 */
guessRouter.post(
  "/",
  validateExecuteGuessRequest,
  async (req: Request, res: Response) => {
    const guessService = new GuessService();
    const { ruleId, boxes } = req.body as ExecuteGuessRequest;

    try {
      const result = await guessService.executeGuess(ruleId, boxes);

      const responseBody: ExecuteGuessResponse = {
        ruleId,
        boxes: result,
        isCorrect: result.every((box) => box.color === "green"),
      };

      res.send(responseBody);
    } catch (e) {
      if (e instanceof ReferenceError) {
        res.status(400).send(e);
      } else if (e instanceof SyntaxError) {
        res.status(400).send(e);
      } else {
        res.status(500).send(e);
      }
    }
  }
);
