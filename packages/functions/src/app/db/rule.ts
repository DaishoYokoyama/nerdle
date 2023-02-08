import { Database } from "./firestore";

import type { Rule } from "../domain";

export class RuleDatabase extends Database<Rule> {
  constructor() {
    super("rule");
  }
}
