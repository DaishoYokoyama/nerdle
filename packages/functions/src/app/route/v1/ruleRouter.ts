import { Router } from "express";

import {
  validateFindGameRuleRequest,
  validateCreateGameRuleRequest,
} from "../../domain";
import { RuleService } from "../../service";

import type {
  FindRuleResponse,
  FindAllRuleResponse,
  CreateRuleRequest,
  CreateRuleResponse,
} from "../../domain";
import type { Request, Response } from "express";

export const ruleRouter = Router();

/**
 * GET /api/v1/rule
 * @returns {FindAllRuleResponse}
 */
ruleRouter.get("/", async (req: Request, res: Response) => {
  const ruleService = new RuleService();

  try {
    const rules = await ruleService.getRules();
    const responseBody: FindAllRuleResponse = rules;
    res.send(responseBody);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * GET /api/v1/rule/:id
 * @returns {FindRuleResponse}
 * @throws {Error}
 */
ruleRouter.get(
  "/:id",
  validateFindGameRuleRequest,
  async (req: Request, res: Response) => {
    const ruleService = new RuleService();

    try {
      const rule = await ruleService.getRule(req.params.id);

      if (!rule) {
        res.status(404).send();
        return;
      }

      const responseBody: FindRuleResponse = rule;
      res.send(responseBody);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

/**
 * POST /api/v1/rule
 * ゲームルールの追加
 * @param {domain.CreateRuleRequest} req.body
 * @returns {domain.CreateRuleResponse}
 * @throws {Error}
 */
ruleRouter.post(
  "/",
  validateCreateGameRuleRequest,
  async (req: Request, res: Response) => {
    const ruleService = new RuleService();
    const requestBody: CreateRuleRequest = req.body;

    try {
      const rule = await ruleService.addRule(
        requestBody.correctValue,
        requestBody.attemptLimits,
        requestBody.keys
      );

      const responseBody: CreateRuleResponse = rule;

      res.send(responseBody);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);
