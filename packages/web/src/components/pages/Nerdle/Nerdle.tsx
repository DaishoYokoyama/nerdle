import { css } from "@emotion/react";
import { Flex } from "@mantine/core";
import { useCallback } from "react";

import { useNerdleGame } from "./Nerdle.hook";

import type { Cell } from "@/types";

import { Header, Keyboard, AnswerForm } from "@/components/elements";
import { GameLayout } from "@/components/layouts";
import { cellTypes } from "@/types";

const contentStyle = css`
  max-width: 500px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const Nerdle = () => {
  const { selectedCellId, currentAttempt, answers, keys, actions } =
    useNerdleGame();

  const onKeyClick = useCallback((cell: Cell) => {
    switch (cell.type) {
      case cellTypes.Delete: {
        return;
      }
      case cellTypes.Enter: {
        return;
      }
      default: {
        actions.update(cell);
      }
    }
  }, []);

  return (
    <GameLayout header={<Header />}>
      <Flex css={contentStyle} gap={20} direction="column">
        <Flex direction="column" gap={10}>
          {answers.map((answer) => (
            <AnswerForm
              key={answer.attempt}
              answer={answer}
              currentAttempt={currentAttempt}
              selectedCellId={selectedCellId}
              onCellClick={actions.select}
            />
          ))}
        </Flex>

        <Keyboard
          numberCells={keys.number}
          operatorCells={keys.operator}
          onClick={onKeyClick}
        />
      </Flex>
    </GameLayout>
  );
};
