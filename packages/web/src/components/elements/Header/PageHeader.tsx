import { css } from "@emotion/react";
import { ActionIcon, Flex, Image } from "@mantine/core";
import { IconQuestionCircle, IconSettings } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import logoUrl from "../../../assets/logo.png";
import { LoadingOverlay } from "../LoadingOverlay";

import type { DefaultProps } from "../../../types";

const pageHeaderStyle = css`
  padding: 16px;
`;

const logoWrapperStyle = css`
  position: relative;
`;

export type HeaderProps = DefaultProps & {
  processing?: boolean;
  onSettingButtonClick?: () => void;
};

export const Header = ({
  className,
  processing,
  onSettingButtonClick,
}: HeaderProps) => {
  return (
    <Flex className={className} gap={10} align="center" css={pageHeaderStyle}>
      <div css={logoWrapperStyle}>
        <Image width={32} src={logoUrl} radius="sm" />
        <AnimatePresence>
          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <LoadingOverlay />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TODO: 遊び方を表示 */}
      <ActionIcon disabled>
        <IconQuestionCircle size={24} />
      </ActionIcon>

      <ActionIcon onClick={onSettingButtonClick}>
        <IconSettings size={24} />
      </ActionIcon>
    </Flex>
  );
};
