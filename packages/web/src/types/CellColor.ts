export const cellColor = {
  Dark: "dark",
  Green: "green",
  Violet: "violet",
} as const;

export type CellColor = (typeof cellColor)[keyof typeof cellColor];
