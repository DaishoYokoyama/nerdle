import { Router } from "express";

import { gameRuleDb } from "../../db/gameRule";

import type * as domain from "../../domain";

export const gamePlayRouter = Router();

/**********************
 * ゲーム開始用のAPI
 * TODO: セッション管理
 **********************/

/**
 * GET /api/v1/gamePlay
 * @returns {FindGameRuleResponse}
 * @throws {Error}
 */
gamePlayRouter.post("/", async (req, res) => {
  const gameRules = await gameRuleDb.getAll();
  const gameRule = gameRules[0];

  const responseBody: domain.FindGameRuleResponse = {
    id: gameRules[0].id,
    correctValueLength: gameRule.correctValue.length,
    attemptLimits: gameRule.attemptLimits,
    keys: gameRule.keys,
  };

  res.send(responseBody);
});
