import { nanoid } from "nanoid";
import { useState, useMemo, useEffect, useCallback } from "react";

import type { GameRule, Box } from "@/types";

import { getGameConfig } from "@/api/rest";
import { isNumberKey, isOperatorKey } from "@/utils";

type NerdleGameState = {
  selectedBoxId?: string;
  gameConfig?: GameRule;

  currentAttempt: number;
  boxes: Box[];
};

export const useNerdleGame = () => {
  const [state, setState] = useState<NerdleGameState>({
    currentAttempt: 1,
    boxes: [],
  });

  const numberKeys = useMemo(
    () => state.gameConfig?.keys.filter(isNumberKey) || [],
    [state.gameConfig]
  );

  const operatorKeys = useMemo(
    () => state.gameConfig?.keys.filter(isOperatorKey) || [],
    [state.gameConfig]
  );

  const selectedBox = useMemo(
    () =>
      state.selectedBoxId
        ? state.boxes.find((box) => box.id === state.selectedBoxId)
        : undefined,
    [state.selectedBoxId, state.boxes]
  );

  const selectBox = useCallback(
    (box: Box) => setState((prev) => ({ ...prev, selectedBoxId: box.id })),
    [setState]
  );

  const selectToNextBox = useCallback(() => {
    if (!selectedBox) return;

    const currentIndex = state.boxes.findIndex(
      (box) => box.id === selectedBox.id
    );
    const nextBox = state.boxes[currentIndex + 1];

    if (nextBox && selectedBox.group === nextBox.group) {
      selectBox(nextBox);
    }
  }, [selectedBox, state.boxes, selectBox]);

  const selectToPrevBox = useCallback(() => {
    if (!selectedBox) return;

    const currentIndex = state.boxes.findIndex(
      (box) => box.id === selectedBox.id
    );

    const prevBox = state.boxes[currentIndex - 1];

    if (prevBox && selectedBox.group === prevBox.group) {
      selectBox(prevBox);
    }
  }, [selectedBox, state.boxes, selectBox]);

  const setBoxValue = useCallback(
    (value: string) => {
      if (!selectedBox) return;

      setState((prev) => ({
        ...prev,
        boxes: prev.boxes.map((box) =>
          box.id === selectedBox.id ? { ...box, value } : box
        ),
      }));
      selectToNextBox();
    },
    [setState, selectedBox, selectToNextBox]
  );

  const backspace = useCallback(() => {
    if (!selectedBox) return;

    // NOTE: 箱の値が入力済みの場合は値を削除して終了
    if (selectedBox.value) {
      setState((prev) => ({
        ...prev,
        boxes: prev.boxes.map((box) =>
          box.id === selectedBox.id ? { ...box, value: undefined } : box
        ),
      }));
      return;
    }

    const currentIndex = state.boxes.findIndex(
      (box) => box.id === selectedBox.id
    );
    const prevBox = state.boxes[currentIndex - 1];

    // NOTE: 前の箱が別のグループ(行が違う場合、処理中断)
    if (selectedBox.group !== prevBox?.group) return;

    setState((prev) => ({
      ...prev,
      boxes: prev.boxes.map((box) =>
        box.id === prevBox.id ? { ...box, value: undefined } : box
      ),
    }));

    selectToPrevBox();
  }, [selectedBox, setState, selectToPrevBox]);

  const loadGameConfig = useCallback(async () => {
    const gameConfig = await getGameConfig();

    // MEMO: ゲームの設定情報から画面に表示する箱を生成
    const boxes = Array.from({ length: gameConfig.attemptLimits }).flatMap(
      (_, i) => {
        const row = String(i + 1);
        return Array.from({ length: gameConfig.correctValueLength }).map<Box>(
          () => ({
            id: nanoid(),
            group: row,
          })
        );
      }
    );

    setState({
      selectedBoxId: boxes[0].id,
      currentAttempt: 1,
      gameConfig,
      boxes,
    });
  }, [setState]);

  useEffect(() => {
    loadGameConfig();
  }, []);

  return {
    ...state,

    selectedBox,

    keys: {
      number: numberKeys,
      operator: operatorKeys,
    },

    actions: {
      selectBox,
      selectToNextBox,
      selectToPrevBox,
      setBoxValue,
      backspace,
    },
  };
};
