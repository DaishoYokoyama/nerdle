import { Database } from "./firestore";

import type { Rule } from "../dto/rule/rule";

class GameRuleDatabase extends Database<Rule> {}

export const gameRuleDb = new GameRuleDatabase("gameRule");
