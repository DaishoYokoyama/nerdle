import { Database } from "./firestore";

import type { GameRule } from "../dto/gameRule/gameRule";

class GameRuleDatabase extends Database<GameRule> {}

export const gameRuleDb = new GameRuleDatabase("gameRule");
