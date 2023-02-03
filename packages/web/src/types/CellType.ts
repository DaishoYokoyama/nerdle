export const cellTypes = {
  Number: "number",
  Operator: "operator",
  Enter: "enter",
  Delete: "delete",
} as const;

export type CellType = (typeof cellTypes)[keyof typeof cellTypes];
