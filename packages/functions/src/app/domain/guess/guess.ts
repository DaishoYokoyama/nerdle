import type { Box } from "../box";

/***********************
 * REST入出力
 ***********************/

export type ExecuteGuessRequest = {
  ruleId: string;
  boxes: Box[];
};

export type ExecuteGuessResponse = {
  ruleId: string;
  boxes: Box[];
  isCorrect: boolean;
};
