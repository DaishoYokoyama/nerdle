import { cloneDeep } from "lodash";
import { useState, useMemo, useEffect, useCallback } from "react";

import type { Cell, Answer, GameConfig } from "@/types";

import { getGameConfig } from "@/api/rest";
import { isNumberCell, isOperatorCell } from "@/types";
import { generateAnswerCells } from "@/utils";

type NerdleGameState = {
  selectedCellId?: string;
  gameConfig?: GameConfig;

  currentAttempt: number;
  answers: Answer[];
};

export const useNerdleGame = () => {
  const [state, setState] = useState<NerdleGameState>({
    currentAttempt: 1,
    answers: [],
  });

  /**
   * Number keys from game config
   */
  const numberKeys = useMemo(
    () => state.gameConfig?.keys.filter(isNumberCell) || [],
    [state.gameConfig]
  );

  /**
   * Operator keys from game config
   */
  const operatorKeys = useMemo(
    () => state.gameConfig?.keys.filter(isOperatorCell) || [],
    [state.gameConfig]
  );

  const select = (cell: Cell) =>
    setState((prev) => ({ ...prev, selectedCellId: cell.id }));

  const update = (key: Cell) =>
    setState((prev) => {
      if (prev.selectedCellId === undefined) return prev;

      const answers = cloneDeep(state.answers);
      const answer = answers.find((answer) =>
        answer.cells.some((cell) => cell.id === state.selectedCellId)
      );
      if (!answer) return prev;

      const cell = answer.cells.find(
        (cell) => cell.id === state.selectedCellId
      );
      if (!cell) return prev;
      cell.value = key.value;

      console.info(cell.id, prev.selectedCellId);

      return {
        ...prev,
        answers,
      };
    });

  /**
   * Load game config from API
   */
  const loadGameConfig = useCallback(async () => {
    const gameConfig = await getGameConfig();
    const answers = generateAnswerCells(gameConfig);
    const selectedCellId = answers[0].cells[0].id;

    setState({
      currentAttempt: 1,
      selectedCellId,
      gameConfig,
      answers,
    });
  }, []);

  useEffect(() => {
    loadGameConfig();
  }, []);

  return {
    selectedCellId: state.selectedCellId,
    currentAttempt: state.currentAttempt,
    answers: state.answers,

    keys: {
      number: numberKeys,
      operator: operatorKeys,
    },

    actions: {
      select,
      update,
    },
  };
};
