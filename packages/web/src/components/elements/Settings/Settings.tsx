import { css } from "@emotion/react";
import { Button, Flex, Text, Divider, Switch, Alert } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useCallback } from "react";

const settingsStyle = css`
  padding: 0 20px;
`;

const switchStyle = css`
  margin-top: 20px;
`;

export type SettingsProps = {
  onRestart?: () => void;
};

export const Settings = ({ onRestart }: SettingsProps) => {
  const handleRestart = useCallback(async () => {
    if (!onRestart) return;

    openConfirmModal({
      title: <Text weight="bold">新しくゲームを始める</Text>,
      children: (
        <Alert color="red">
          <Text color="red" weight="bold" size="sm">
            この操作はやり直すことができません。よろしいですか？
          </Text>
        </Alert>
      ),
      labels: { cancel: "キャンセル", confirm: "新しく始める" },
      confirmProps: { color: "red" },
      onConfirm: onRestart,
    });
  }, [onRestart]);

  return (
    <div css={settingsStyle}>
      <Flex direction="column" gap={20}>
        <section>
          <Text weight="bold">ゲームをやり直す</Text>
          <Text
            size="xs"
            color="gray"
            css={css`
              margin-bottom: 5px;
            `}
          >
            進行中のゲームをやり直します。新しく出題される問題は、現在のゲームとは異なる問題が出題される可能性があります。
          </Text>
          <Button color="red" onClick={handleRestart}>
            新しく始める
          </Button>
        </section>
        <Divider />
        <section>
          <Text weight="bold" css={css``}>
            ゲーム設定
          </Text>
          <Switch label="ランダム出題モードで遊ぶ" css={switchStyle} />
          <Text
            size="xs"
            color="gray"
            css={css`
              margin-top: 5px;
            `}
          >
            次回ゲーム開始時から有効になります。
          </Text>
        </section>
      </Flex>
    </div>
  );
};
