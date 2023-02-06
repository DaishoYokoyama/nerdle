import { css } from "@emotion/react";
import { Loader } from "@mantine/core";

const loadingOverlayStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.9);
`;

export const LoadingOverlay = () => (
  <div css={loadingOverlayStyle}>
    <Loader color="indigo" size="sm" />
  </div>
);
