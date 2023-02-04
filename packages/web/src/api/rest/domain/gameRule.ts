export type Key = {
  id: string;
  value: string;
  type: "number" | "operator";
  color?: string;
};

export type GameRuleSummary = {
  id: string;
  correctValueLength: number;
  attemptLimits: number;
  keys: Key[];
};

export type FindGameRuleResponse = GameRuleSummary;
