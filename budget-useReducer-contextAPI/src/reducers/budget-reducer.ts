import { v4 as uuidv4 } from "uuid";
import { ExpenseT, DraftExpenseT, CategoryT } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpenseT } }
  | { type: "remove-expense"; payload: { id: ExpenseT["id"] } }
  | { type: "get-expense-by-id"; payload: { id: ExpenseT["id"] } }
  | { type: "update-expense"; payload: { expense: ExpenseT } }
  | { type: "reset-app" }
  | { type: "add-filter-category"; payload: { id: CategoryT["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: ExpenseT[];
  updateId: ExpenseT["id"];
  currentCategory: CategoryT["id"];
};

const initialBudget = (): number => {
  const localSessionBudget = sessionStorage.getItem("budget");

  return localSessionBudget ? +localSessionBudget : 0;
};

const localExpenses = (): ExpenseT[] => {
  const localSessionExpenses = sessionStorage.getItem("expenses");

  return localSessionExpenses ? JSON.parse(localSessionExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localExpenses(),
  updateId: "",
  currentCategory: "",
};

const createExpense = (draftExpense: DraftExpenseT): ExpenseT => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "hide-modal") {
    return {
      ...state,
      modal: false,
      updateId: "",
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      updateId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      updateId: "",
    };
  }

  if (action.type === "reset-app") {
    sessionStorage.removeItem("budget");
    sessionStorage.removeItem("expenses");

    return {
      ...state,
      budget: 0,
      expenses: [],
    };
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
