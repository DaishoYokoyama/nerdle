import { Router } from "express";

export const evaluateRouter = Router();

evaluateRouter.post("/", (req, res) => {
  res.send("evaluate api").status(200);
});
