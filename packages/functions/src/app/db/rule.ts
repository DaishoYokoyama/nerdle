import { Database } from "./firestore";

import type { Rule } from "../dto/rule";

export class RuleDatabase extends Database<Rule> {
  constructor() {
    super("rule");
  }
}
