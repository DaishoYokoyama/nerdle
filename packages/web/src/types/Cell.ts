import { cellTypes } from "./CellType";

import type { CellColor } from "./CellColor";
import type { CellType } from "./CellType";

export type Cell = {
  id: string;
  type?: CellType;
  value?: string;
  color?: CellColor;
};

export type NumberCell = Cell & {
  type: typeof cellTypes.Number;
  value: string;
};

export type OperatorCell = Cell & {
  type: typeof cellTypes.Operator;
  value: string;
};

export const isNumberCell = (cell: Cell): cell is NumberCell =>
  cell.type === cellTypes.Number && cell.value !== undefined;

export const isOperatorCell = (cell: Cell): cell is OperatorCell =>
  cell.type === cellTypes.Operator && cell.value !== undefined;
