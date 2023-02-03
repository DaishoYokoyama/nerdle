import { css } from "@emotion/react";
import { Flex } from "@mantine/core";

import { CellButton } from "../CellButton";

import type { DefaultProps, Cell, NumberCell, OperatorCell } from "@/types";

const buttonRowStyle = css`
  height: 48px;
  max-width: 100%;
  display: flex;
  gap: 4px;
  flex-wrap: nowrap;
`;

const buttonStyle = css`
  flex: 1;
`;

export interface KeypadProps extends DefaultProps {
  numberCells: NumberCell[];
  operatorCells: OperatorCell[];
  onClick?: (cell: Cell) => void;
}

export const Keyboard = ({
  className,
  numberCells,
  operatorCells,
  onClick,
}: KeypadProps) => {
  return (
    <Flex className={className} direction="column" gap={8}>
      <div className="number-row" css={buttonRowStyle}>
        {numberCells.map((cell) => (
          <CellButton
            key={cell.id}
            cell={cell}
            css={buttonStyle}
            onClick={onClick}
          />
        ))}
      </div>
      <div className="operator-action-row" css={buttonRowStyle}>
        {operatorCells.map((cell) => (
          <CellButton
            key={cell.id}
            cell={cell}
            css={buttonStyle}
            onClick={onClick}
          />
        ))}
        <CellButton cell={{ id: "delete", type: "delete", value: "Delete" }} />
        <CellButton cell={{ id: "enter", type: "enter", value: "Enter" }} />
      </div>
    </Flex>
  );
};
