import { Router } from "express";
import { v4 as uuid } from "uuid";

import { gameRuleDb } from "../../db/gameRule";
import * as domain from "../../domain";

import type * as dto from "../../dto";
import type { Request, Response } from "express";

export const gameRuleRouter = Router();

/**
 * POST /api/v1/gameRule
 * @param {CreateGameRuleRequest} req.body
 * @returns {CreateGameRuleResponse}
 */
gameRuleRouter.post(
  "/",
  domain.validateCreateGameRuleRequest,
  async (req: Request, res: Response) => {
    const requestBody: domain.CreateGameRuleRequest = req.body;

    const gameRule: dto.GameRule = {
      id: uuid(),
      correctValue: requestBody.correctValue,
      attemptLimits: requestBody.attemptLimits,
      keys: requestBody.keys.map<dto.Key>((key) => ({
        id: uuid(),
        type: key.type,
        value: key.value,
      })),
    };

    await gameRuleDb.set(gameRule);

    const responseBody: domain.CreateGameRuleResponse = {
      id: gameRule.id,
      attemptLimits: gameRule.attemptLimits,
      correctValue: gameRule.correctValue,
      keys: gameRule.keys,
    };

    res.send(responseBody);
  }
);
