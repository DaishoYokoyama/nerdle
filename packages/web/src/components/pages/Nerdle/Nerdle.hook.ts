import { showNotification } from "@mantine/notifications";
import { useState, useMemo, useEffect, useCallback } from "react";

import { getGameSession, postGuess } from "../../../api/rest";
import { save, load, remove } from "../../../api/storage";

import type { Session, Box } from "../../../types";
import type { AxiosError } from "axios";

const sessionStorageKey = "nerdle-game-session";

type NerdleGameState = {
  processing?: boolean;
  selectedBoxId?: string;
  gameSession?: Session;
  activated?: boolean;
};

export const useNerdleGame = () => {
  const [state, setState] = useState<NerdleGameState>({});

  const selectedBox = useMemo(
    () =>
      state.selectedBoxId
        ? state.gameSession?.boxes.find((box) => box.id === state.selectedBoxId)
        : undefined,
    [state.selectedBoxId, state.gameSession]
  );

  const coloredKeys = useMemo(() => {
    if (!state.gameSession) return [];

    const { keys, boxes } = state.gameSession;

    return keys.map((key) => {
      // FIXME: パフォーマンスが悪いので、色の判定を別の場所に移動したい
      const colors = boxes
        .filter((box) => box.value === key.value)
        .map((box) => box.color);

      if (colors.includes("green")) return { ...key, color: "green" };
      else if (colors.includes("violet")) return { ...key, color: "violet" };
      else if (colors.includes("dark")) return { ...key, color: "dark" };
      return key;
    });
  }, [state.gameSession]);

  const selectBox = useCallback(
    (box: Box) => setState((prev) => ({ ...prev, selectedBoxId: box.id })),
    [setState]
  );

  const selectToNextBox = useCallback(() => {
    if (!selectedBox || !state.gameSession) return;

    const { boxes } = state.gameSession;
    const currentIndex = boxes.findIndex((box) => box.id === selectedBox.id);
    const nextBox = boxes[currentIndex + 1];

    if (nextBox && selectedBox.group === nextBox.group) {
      selectBox(nextBox);
    }
  }, [selectedBox, state.gameSession, selectBox]);

  const selectToPrevBox = useCallback(() => {
    if (!selectedBox || !state.gameSession) return;

    const { boxes } = state.gameSession;
    const currentIndex = boxes.findIndex((box) => box.id === selectedBox.id);
    const prevBox = boxes[currentIndex - 1];

    if (prevBox && selectedBox.group === prevBox.group) {
      selectBox(prevBox);
    }
  }, [selectedBox, state.gameSession, selectBox]);

  const selectToNextLine = useCallback(() => {
    if (!selectBox || !state.gameSession) return;
    if (state.gameSession.attempt >= state.gameSession.attemptLimits) return;

    const nextAttempt = String(state.gameSession.attempt + 1);

    const box = state.gameSession.boxes.find(
      (box) => box.group === nextAttempt
    );
    if (!box) return;

    setState((prev) => ({
      ...prev,
      selectedBoxId: box.id,
    }));
  }, [state.gameSession, selectBox]);

  const backspace = useCallback(() => {
    if (!selectedBox || !state.gameSession) return;

    // NOTE: 箱の値が入力済みの場合は値を削除して終了
    if (selectedBox.value) {
      setState((prev) => {
        if (!prev.gameSession) return prev;

        return {
          ...prev,
          gameSession: {
            ...prev.gameSession,
            boxes: prev.gameSession.boxes.map((box) =>
              box.id === selectedBox.id ? { ...box, value: undefined } : box
            ),
          },
        };
      });
      return;
    }

    const { boxes } = state.gameSession;
    const currentIndex = boxes.findIndex((box) => box.id === selectedBox.id);
    const prevBox = boxes[currentIndex - 1];

    // NOTE: 前の箱が別のグループ(行が違う場合、処理中断)
    if (selectedBox.group !== prevBox?.group) return;

    setState((prev) => {
      if (!prev.gameSession) return prev;

      return {
        ...prev,
        gameSession: {
          ...prev.gameSession,
          boxes: prev.gameSession.boxes.map((box) =>
            box.id === prevBox.id ? { ...box, value: undefined } : box
          ),
        },
      };
    });

    selectToPrevBox();
  }, [selectedBox, state.gameSession, setState, selectToPrevBox]);

  const setBoxValue = useCallback(
    (value: string) => {
      if (!selectedBox) return;

      setState((prev) => {
        if (!prev.gameSession) return prev;

        return {
          ...prev,
          gameSession: {
            ...prev.gameSession,
            boxes: prev.gameSession.boxes.map((box) =>
              box.id === selectedBox.id ? { ...box, value } : box
            ),
          },
        };
      });
      selectToNextBox();
    },
    [setState, selectedBox, selectToNextBox]
  );

  const loadGameConfig = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, processing: true }));

      const prevSession = await load<Session>(sessionStorageKey);
      if (prevSession) {
        const selectedBox = prevSession.boxes.filter(
          (box) => box.group === prevSession.attempt.toString()
        )[0];

        setState((prev) => ({
          ...prev,
          selectedBoxId: selectedBox.id,
          gameSession: prevSession,
        }));
        return true;
      }

      const gameSession = await getGameSession().catch(
        (e: AxiosError<Error>) => {
          showNotification({ message: e.response?.data.message, color: "red" });
        }
      );

      if (!gameSession) return false;

      setState((prev) => ({
        ...prev,
        selectedBoxId: gameSession.boxes[0].id,
        gameSession,
      }));
    } finally {
      setState((prev) => ({ ...prev, processing: false }));
    }
    return true;
  }, [setState]);

  const submitGuess = useCallback(async () => {
    if (!state.gameSession) return;
    if (state.gameSession.attempt >= state.gameSession.attemptLimits) return;

    try {
      setState((prev) => ({ ...prev, processing: true }));
      const { ruleId, boxes, attempt } = state.gameSession;

      const guess = boxes.filter((box) => box.group === String(attempt));
      const guessResult = await postGuess({ ruleId, boxes: guess }).catch(
        (e: AxiosError<string>) => {
          showNotification({ message: e.response?.data, color: "red" });
        }
      );

      if (!guessResult) return;

      const mergedBoxes = boxes.map((box) => {
        const r = guessResult.boxes.find((x) => x.id === box.id);
        return r ? r : box;
      });

      setState((prev) => {
        if (!prev.gameSession) return prev;

        return {
          ...prev,
          gameSession: {
            ...prev.gameSession,
            attempt: prev.gameSession.attempt + 1,
            boxes: mergedBoxes,
          },
        };
      });
    } finally {
      setState((prev) => ({ ...prev, processing: false }));
    }

    selectToNextLine();
  }, [state.gameSession, setState, selectToNextLine]);

  const restartGame = useCallback(async () => {
    await remove(sessionStorageKey);
    await loadGameConfig();

    showNotification({
      message: "新しくゲームを開始しました！",
      color: "green",
    });
  }, [loadGameConfig]);

  useEffect(() => {
    if (state.gameSession) {
      save(sessionStorageKey, state.gameSession);
    }
  }, [state.gameSession]);

  useEffect(() => {
    loadGameConfig().then((activated) => {
      setState((prev) => ({ ...prev, activated }));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    selectedBox,
    coloredKeys,
    actions: {
      selectBox,
      selectToNextBox,
      selectToPrevBox,
      selectToNextLine,
      setBoxValue,
      backspace,
      submitGuess,
      restartGame,
    },
  };
};
