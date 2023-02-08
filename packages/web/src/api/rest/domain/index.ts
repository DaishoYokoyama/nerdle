/*****************************************************
 * This file is generated from the API specification.
 *****************************************************/

export type Color = "green" | "dark" | "violet";

export type DataAccessObject = {
  id: string;
  createdAt: string;
};

export type Box = {
  id: string;
  value?: string;
  group: string;
  color?: Color;
};

export type Key = DataAccessObject & {
  value: string;
  type: "number" | "operator";
  color?: Color;
};

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

export type ExecuteGuessRequest = {
  ruleId: string;
  boxes: Box[];
};

export type ExecuteGuessResponse = {
  ruleId: string;
  boxes: Box[];
  isCorrect: boolean;
};
