import { http } from "./client";

import type {
  CreateSessionRequest,
  CreateRuleResponse,
  ExecuteGuessRequest,
  ExecuteGuessResponse,
} from "./domain";

export const getGameSession = async (payload?: CreateSessionRequest) => {
  let url = "/v1/session";
  if (payload?.ruleId) {
    url += `/${payload.ruleId}`;
  }
  return http.get<CreateRuleResponse>(url).then((res) => res.data);
};

export const postGuess = async (payload: ExecuteGuessRequest) =>
  http.post<ExecuteGuessResponse>("/v1/guess", payload).then((res) => res.data);
