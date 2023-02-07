import { css } from "@emotion/react";
import { Text, Button } from "@mantine/core";

export type GameOverNoticeProps = {
  onRestart?: () => void;
};

export const GameOverNotice = ({ onRestart }: GameOverNoticeProps) => {
  return (
    <>
      <Text>ゲームオーバーです...</Text>
      <Button
        onClick={onRestart}
        css={css`
          margin-top: 20px;
        `}
      >
        もう一度挑戦する
      </Button>
    </>
  );
};
