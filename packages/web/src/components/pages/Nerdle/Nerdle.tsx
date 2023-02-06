import { css } from "@emotion/react";
import { Flex, Text, Drawer } from "@mantine/core";
import { useMemo, useState } from "react";

import {
  Header,
  Keyboard,
  Button,
  LoadingOverlay,
  Settings,
} from "../../../components/elements";
import { GameLayout } from "../../../components/layouts";

import { useNerdleGame } from "./Nerdle.hook";

const contentStyle = css`
  max-width: 500px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const Nerdle = () => {
  const [displayConfig, setDisplayConfig] = useState(false);

  const {
    processing,
    selectedBox,
    coloredKeys,
    gameSession,
    actions,
    activated,
  } = useNerdleGame();

  const boxWrapperStyle = useMemo(
    () => css`
      display: grid;
      grid-template-columns: repeat(${gameSession?.correctValueLength}, 1fr);
      gap: 4px;
    `,
    [gameSession?.correctValueLength]
  );

  return (
    <>
      <GameLayout
        header={
          <Header
            processing={processing}
            onSettingButtonClick={() => setDisplayConfig(true)}
          />
        }
      >
        {(() => {
          if (activated === undefined) {
            return <LoadingOverlay />;
          } else if (activated === false) {
            return <Text color="gray">読み込みに失敗しました</Text>;
          }
          return (
            <Flex css={contentStyle} gap={20} direction="column">
              <div css={boxWrapperStyle}>
                {gameSession?.boxes.map((box) => (
                  <Button
                    key={box.id}
                    color={box.color}
                    selected={box.id === selectedBox?.id}
                    onClick={() => actions.selectBox(box)}
                    readonly={box.group !== String(gameSession?.attempt)}
                  >
                    {box.value}
                  </Button>
                ))}
              </div>
              <Keyboard
                keys={coloredKeys}
                onKeyClick={(e) => actions.setBoxValue(e.value)}
                onEnterClick={actions.submitGuess}
                onDeleteClick={actions.backspace}
                onLeftArrowClick={actions.selectToPrevBox}
                onRightArrowClick={actions.selectToNextBox}
              />
            </Flex>
          );
        })()}
      </GameLayout>
      <Drawer opened={displayConfig} onClose={() => setDisplayConfig(false)}>
        <Settings
          onRestart={() => {
            actions.restartGame();
            setDisplayConfig(false);
          }}
        />
      </Drawer>
    </>
  );
};
