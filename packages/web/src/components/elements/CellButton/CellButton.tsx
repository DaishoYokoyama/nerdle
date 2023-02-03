import { css } from "@emotion/react";
import { Button } from "@mantine/core";

import type { DefaultProps, Cell } from "@/types";

const cellButtonStyle = css`
  padding: 0 2px;
  height: 100%;
  display: grid;
  place-content: center;
`;

const selectedStyle = css`
  animation: blink 1s ease-in-out infinite alternate;

  @keyframes blink {
    0% {
      border: 2px solid #f9dfd5;
    }
    100% {
      border: 2px solid #da5019;
    }
  }
`;

export interface CellButtonProps extends DefaultProps {
  cell: Cell;
  selected?: boolean;
  onClick?: (cell: Cell) => void;
}

export const CellButton = ({
  className,
  cell,
  selected,
  onClick,
}: CellButtonProps) => {
  return (
    <Button
      className={className}
      color={cell.color}
      variant={cell.color ? undefined : "default"}
      radius="md"
      css={css([cellButtonStyle, selected && selectedStyle])}
      onClick={() => onClick?.(cell)}
    >
      {cell.value}
    </Button>
  );
};
