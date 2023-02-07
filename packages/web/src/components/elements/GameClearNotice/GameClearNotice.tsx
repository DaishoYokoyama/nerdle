import { css } from "@emotion/react";
import { Divider, Text, Button, Flex } from "@mantine/core";

export type GameClearNoticeProps = {
  attempt: number;
  onRestart?: () => void;
};

export const GameClearNotice = ({
  attempt,
  onRestart,
}: GameClearNoticeProps) => {
  return (
    <>
      <Text>ゲームクリアです！</Text>
      <Flex>
        挑戦回数:<Text weight="bold">{attempt}</Text>回
      </Flex>
      <Divider />
      <Button
        onClick={onRestart}
        css={css`
          margin-top: 20px;
        `}
      >
        ゲームをやり直す
      </Button>
    </>
  );
};
