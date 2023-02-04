import { Router } from "express";
import { v4 as uuid } from "uuid";

import { gameRuleDb } from "../../db/rule";
import * as domain from "../../domain";

import type * as dto from "../../dto";
import type { Request, Response } from "express";

export const ruleRouter = Router();

/**
 * GET /api/v1/rule
 * @returns {domain.FindAllRuleResponse}
 * @throws {Error}
 */
ruleRouter.get("/", async (req: Request, res: Response) => {
  const gameRules = await gameRuleDb.getAll();

  const responseBody: domain.FindAllRuleResponse =
    gameRules.map<domain.RuleSummary>((gameRule) => ({
      id: gameRule.id,
      correctValueLength: gameRule.correctValue.length,
      attemptLimits: gameRule.attemptLimits,
      keys: gameRule.keys,
    }));

  res.send(responseBody);
});

/**
 * GET /api/v1/rule/:id
 * @returns {domain.FindRuleResponse}
 * @throws {Error}
 */
ruleRouter.get(
  "/:id",
  domain.validateFindGameRuleRequest,
  async (req: Request, res: Response) => {
    const gameRule = await gameRuleDb.get(req.params.id);

    const responseBody: domain.FindRuleResponse = {
      id: gameRule.id,
      correctValueLength: gameRule.correctValue.length,
      attemptLimits: gameRule.attemptLimits,
      keys: gameRule.keys,
    };

    res.send(responseBody);
  }
);

/**
 * POST /api/v1/rule
 * @param {domain.CreateRuleRequest} req.body
 * @returns {domain.CreateRuleResponse}
 * @throws {Error}
 */
ruleRouter.post(
  "/",
  domain.validateCreateGameRuleRequest,
  async (req: Request, res: Response) => {
    const requestBody: domain.CreateRuleRequest = req.body;

    const gameRule: dto.Rule = {
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

    const responseBody: domain.CreateRuleResponse = {
      id: gameRule.id,
      attemptLimits: gameRule.attemptLimits,
      correctValue: gameRule.correctValue,
      keys: gameRule.keys,
    };

    res.send(responseBody);
  }
);
