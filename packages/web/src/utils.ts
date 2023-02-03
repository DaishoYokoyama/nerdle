import { nanoid } from "nanoid";

import type { GameConfig, Answer, Cell } from "@/types";

export const generateAnswerCells = (config: GameConfig) => {
  const answers = Array.from({ length: config.attemptLimits }).map<Answer>(
    (_, i) => {
      const attempt = i + 1;
      const cells = Array.from({ length: config.cellCount }).map<Cell>(() => ({
        id: nanoid(),
      }));

      return { attempt, cells };
    }
  );

  return answers;
};
