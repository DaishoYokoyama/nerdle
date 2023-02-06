import { css } from "@emotion/react";
import { Flex } from "@mantine/core";

import { Button } from "../Button";

import type { Key, DefaultProps } from "../../../types";

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
  keys: Key[];
  onClick?: (cell: Key) => void;
  onDeleteClick?: () => void;
  onEnterClick?: () => void;
}

export const Keyboard = ({
  className,
  keys,
  onClick,
  onDeleteClick,
  onEnterClick,
}: KeypadProps) => {
  return (
    <Flex className={className} direction="column" gap={8}>
      <div className="number-row" css={buttonRowStyle}>
        {keys
          .filter((key) => key.type === "number")
          .map((key) => (
            <Button
              key={key.id}
              color={key.color}
              css={buttonStyle}
              onClick={() => onClick?.(key)}
            >
              {key.value}
            </Button>
          ))}
      </div>
      <div className="operator-action-row" css={buttonRowStyle}>
        {keys
          .filter((key) => key.type === "operator")
          .map((key) => (
            <Button
              key={key.id}
              color={key.color}
              css={buttonStyle}
              onClick={() => onClick?.(key)}
            >
              {key.value}
            </Button>
          ))}
        <Button css={buttonStyle} onClick={onDeleteClick}>
          Delete
        </Button>
        <Button css={buttonStyle} onClick={onEnterClick}>
          Enter
        </Button>
      </div>
    </Flex>
  );
};
