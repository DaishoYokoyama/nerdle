import { css } from "@emotion/react";
import { Flex } from "@mantine/core";

import type { DefaultProps, Answer, Cell } from "@/types";

import { CellButton } from "@/components/elements/CellButton";

const answerFormStyle = css`
  display: flex;
  height: 48px;
`;

const buttonStyle = css`
  flex: 1;
`;

export interface AnswerFormProps extends DefaultProps {
  answer: Answer;
  selectedCellId?: string;
  currentAttempt: number;
  onCellClick?: (cell: Cell) => void;
}

export const AnswerForm = ({
  className,
  answer,
  selectedCellId,
  currentAttempt,
  onCellClick,
}: AnswerFormProps) => {
  return (
    <Flex className={className} gap={8} css={answerFormStyle}>
      {answer.cells.map((cell) => {
        const canClick = answer.attempt === currentAttempt;

        return (
          <CellButton
            key={`${cell.id}`}
            cell={cell}
            css={buttonStyle}
            selected={cell.id === selectedCellId}
            onClick={() => canClick && onCellClick?.(cell)}
          />
        );
      })}
    </Flex>
  );
};
