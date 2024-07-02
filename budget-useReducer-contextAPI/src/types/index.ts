export type ExpenseT = {
  id: string;
  amount: number;
  expenseName: string;
  category: string;
  date: Value;
};

export type DraftExpenseT = Omit<ExpenseT, "id">;

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type CategoryT = {
  id: string;
  name: string;
  icon: string;
};
