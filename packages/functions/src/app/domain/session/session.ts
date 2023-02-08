import type { Box } from "../box";
import type { Key } from "../key";

/***********************
 * Data Transfer Object
 ***********************/

export type Session = {
  id: string;
  ruleId: string;
  attempt: number;
  attemptLimits: number;
  correctValueLength: number;
  boxes: Box[];
  keys: Key[];
};

export type CreateSessionRequest = {
  ruleId?: string;
};

export type CreateSessionResponse = Session;
