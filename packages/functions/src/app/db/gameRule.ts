import { Database } from "./firestore";

import type { GameRule } from "@/app/dto/gameRule";

class GameRuleDatabase extends Database<GameRule> {}

export const gameRuleDb = new GameRuleDatabase("gameRule");
