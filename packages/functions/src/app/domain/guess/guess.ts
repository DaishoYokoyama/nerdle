import type { Box } from "../box";

/***********************
 * Data Transfer Object
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
