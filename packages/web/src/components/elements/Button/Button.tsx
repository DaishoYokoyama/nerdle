import { css } from "@emotion/react";
import { Button as MantineButton } from "@mantine/core";

import type { DefaultProps } from "../../../types";
import type { DefaultMantineColor } from "@mantine/core";
import type { ReactNode, MouseEventHandler } from "react";

const buttonStyle = css`
  padding: 0 2px;
  display: grid;
  min-height: 48px;
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

export interface ButtonProps extends DefaultProps {
  children?: ReactNode;
  color?: DefaultMantineColor;
  selected?: boolean;
  readonly?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({
  className,
  children,
  color,
  selected,
  readonly,
  onClick,
}: ButtonProps) => {
  return (
    <MantineButton
      className={className}
      css={css([buttonStyle, selected && selectedStyle])}
      color={color}
      variant={color ? undefined : "default"}
      onClick={readonly ? undefined : onClick}
      radius="md"
    >
      {children}
    </MantineButton>
  );
};
