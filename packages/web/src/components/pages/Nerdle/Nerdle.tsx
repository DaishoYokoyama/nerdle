import { css } from "@emotion/react";
import { Flex } from "@mantine/core";
import { useMemo } from "react";

import { Header, Keyboard } from "../../components/elements";

import { useNerdleGame } from "./Nerdle.hook";

import { Button } from "@/components/elements/Button";
import { GameLayout } from "@/components/layouts";

const contentStyle = css`
  max-width: 500px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const Nerdle = () => {
  const { selectedBox, currentAttempt, keys, boxes, gameConfig, actions } =
    useNerdleGame();

  const boxWrapperStyle = useMemo(
    () => css`
      display: grid;
      grid-template-columns: repeat(${gameConfig?.correctValueLength}, 1fr);
      gap: 4px;
    `,
    [gameConfig]
  );

  return (
    <GameLayout header={<Header />}>
      <Flex css={contentStyle} gap={20} direction="column">
        <div css={boxWrapperStyle}>
          {boxes.map((box) => (
            <Button
              key={box.id}
              color={box.color}
              selected={box.id === selectedBox?.id}
              onClick={() => actions.selectBox(box)}
              readonly={box.group !== String(currentAttempt)}
            >
              {box.value}
            </Button>
          ))}
        </div>
        <Keyboard
          numberKeys={keys.number}
          operatorKeys={keys.operator}
          onClick={(e) => actions.setBoxValue(e.value)}
          onDeleteClick={actions.backspace}
        />
      </Flex>
    </GameLayout>
  );
};
