import { css } from "@emotion/react";
import { ActionIcon, Flex, Image, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import {
  IconQuestionCircle,
  IconSettings,
  IconBrandGithub,
} from "@tabler/icons-react";

import type { DefaultProps } from "@/types";

import logoUrl from "@/assets/logo.png";
import { GITHUB_REPOSITORY_URL } from "@/constants";

const pageHeaderStyle = css`
  padding: 16px;
  position: relative;
`;

const githubButtonStyle = css`
  position: absolute;
  right: 16px;
`;

export type HeaderProps = DefaultProps;

export const Header = ({ className }: HeaderProps) => {
  const onGithubButtonClick = () =>
    openConfirmModal({
      title: "外部サイトに移動します、よろしいですか？",
      children: (
        <>
          <Text size="sm">以下のサイトにアクセスします。</Text>
          <Text size="sm">{GITHUB_REPOSITORY_URL}</Text>
        </>
      ),
      labels: { confirm: "遷移する", cancel: "キャンセル" },
      onConfirm: () => window.open(GITHUB_REPOSITORY_URL, "_blank"),
    });

  return (
    <Flex className={className} gap={10} align="center" css={pageHeaderStyle}>
      <Image width={32} src={logoUrl} radius="sm" />

      {/* TODO: 遊び方を表示 */}
      <ActionIcon disabled>
        <IconQuestionCircle size={24} />
      </ActionIcon>

      {/* TODO: アプリケーション設定の表示 */}
      <ActionIcon disabled>
        <IconSettings size={24} />
      </ActionIcon>

      <ActionIcon css={githubButtonStyle} onClick={onGithubButtonClick}>
        <IconBrandGithub size={24} />
      </ActionIcon>
    </Flex>
  );
};
