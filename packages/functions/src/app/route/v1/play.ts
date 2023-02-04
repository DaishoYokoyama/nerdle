import { Router } from "express";

import { gameRuleDb } from "../../db/rule";

import type * as domain from "../../domain";

export const gamePlayRouter = Router();

/**
 * GET /api/v1/gamePlay
 * @returns {domain.FindRuleResponse}
 * @throws {Error}
 */
gamePlayRouter.post("/", async (req, res) => {
  const gameRules = await gameRuleDb.getAll();
  const gameRule = gameRules[0];

  const responseBody: domain.FindRuleResponse = {
    id: gameRules[0].id,
    correctValueLength: gameRule.correctValue.length,
    attemptLimits: gameRule.attemptLimits,
    keys: gameRule.keys,
  };

  res.send(responseBody);
});
