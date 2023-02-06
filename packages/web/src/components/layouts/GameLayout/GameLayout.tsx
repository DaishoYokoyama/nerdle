import { css } from "@emotion/react";

import type { DefaultProps } from "../../../types";
import type { ReactNode } from "react";

const mainLayoutStyle = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
`;

const headerStyle = css`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

export interface MainLayoutProps extends DefaultProps {
  children?: ReactNode;
  header?: ReactNode;
}

export const GameLayout = ({
  className,
  children,
  header,
}: MainLayoutProps) => {
  return (
    <div className={className} css={mainLayoutStyle}>
      <header css={headerStyle}>{header}</header>
      <main>{children}</main>
    </div>
  );
};
