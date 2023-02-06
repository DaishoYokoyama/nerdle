import { Router } from "express";

import { validateCreateSessionRequest } from "../../domain";
import { SessionService } from "../../service";

import type { CreateSessionResponse } from "../../domain";
import type { Request, Response } from "express";

export const sessionRouter = Router();

/**
 * POST /api/v1/session
 * ゲームセッションの作成
 * @returns {CreateSessionResponse}
 * @throws {Error}
 */
sessionRouter.get(
  "/:ruleId?",
  validateCreateSessionRequest,
  async (req: Request, res: Response) => {
    const ruleId = req.params.ruleId as string | undefined;
    const sessionService = new SessionService();

    try {
      const session = await sessionService.createSession(ruleId);
      const responseBody: CreateSessionResponse = session;
      res.send(responseBody);
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).send({ error: e.message });
      } else {
        res.status(500).send(e);
      }
    }
  }
);