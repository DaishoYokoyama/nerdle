import { Router } from "express";
import { v4 as uuid } from "uuid";

import { gameRuleDb } from "../../db/gameRule";
import * as domain from "../../domain";

import type * as dto from "../../dto";
import type { Request, Response } from "express";

export const gameRuleRouter = Router();

/**
 * GET /api/v1/gameRule
 * @returns {FindAllGameRuleResponse}
 * @throws {Error}
 */
gameRuleRouter.get("/", async (req: Request, res: Response) => {
  const gameRules = await gameRuleDb.getAll();

  const responseBody: domain.FindAllGameRuleResponse =
    gameRules.map<domain.GameRuleSummary>((gameRule) => ({
      id: gameRule.id,
      correctValueLength: gameRule.correctValue.length,
      attemptLimits: gameRule.attemptLimits,
      keys: gameRule.keys,
    }));

  res.send(responseBody);
});

/**
 * GET /api/v1/gameRule/:id
 * @returns {FindGameRuleResponse}
 * @throws {Error}
 */
gameRuleRouter.get(
  "/:id",
  domain.validateFindGameRuleRequest,
  async (req: Request, res: Response) => {
    const gameRule = await gameRuleDb.get(req.params.id);

    const responseBody: domain.FindGameRuleResponse = {
      id: gameRule.id,
      correctValueLength: gameRule.correctValue.length,
      attemptLimits: gameRule.attemptLimits,
      keys: gameRule.keys,
    };

    res.send(responseBody);
  }
);

/**
 * GET /api/v1/gameRule/current
 * @returns {FindGameRuleResponse}
 * @throws {Error}
 */
gameRuleRouter.get("/current", async (req: Request, res: Response) => {
  const gameRules = await gameRuleDb.getAll();

  // FIXME: 一旦最初のルールを返すが、将来的には現在のルールを返すようにする
  const gameRule = gameRules[0];

  const responseBody: domain.FindGameRuleResponse = {
    id: gameRule.id,
    correctValueLength: gameRule.correctValue.length,
    attemptLimits: gameRule.attemptLimits,
    keys: gameRule.keys,
  };

  res.send(responseBody);
});

/**
 * POST /api/v1/gameRule
 * @param {CreateGameRuleRequest} req.body
 * @returns {CreateGameRuleResponse}
 * @throws {Error}
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
