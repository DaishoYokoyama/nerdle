import { css } from "@emotion/react";
import { Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

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
  onKeyClick?: (cell: Key) => void;
  onDeleteClick?: () => void;
  onEnterClick?: () => void;
  onLeftArrowClick?: () => void;
  onRightArrowClick?: () => void;
}

export const Keyboard = ({
  className,
  keys,
  onKeyClick,
  onDeleteClick,
  onEnterClick,
  onLeftArrowClick,
  onRightArrowClick,
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
              onClick={() => onKeyClick?.(key)}
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
              onClick={() => onKeyClick?.(key)}
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
      <div
        css={css([
          buttonRowStyle,
          css`
            margin-top: 10px;
            justify-content: space-between;
          `,
        ])}
      >
        <Button css={buttonStyle} onClick={onLeftArrowClick}>
          <IconChevronLeft />
        </Button>
        <Button css={buttonStyle} onClick={onRightArrowClick}>
          <IconChevronRight />
        </Button>
      </div>
    </Flex>
  );
};
