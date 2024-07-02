import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { categories } from "../data";
import { DraftExpenseT, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpenseT>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);

  const { state, availableBudget, dispatch } = useBudget();

  useEffect(() => {
    if (state.updateId) {
      const updateExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.updateId
      )[0];

      setExpense(updateExpense);
      setPreviousAmount(updateExpense.amount);
    }
  }, [state.updateId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (expense.amount - previousAmount > availableBudget) {
      setError("Ese gasto se sale del presupuesto");
      return;
    }

    if (state.updateId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.updateId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setError("");
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
    setPreviousAmount(0);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.updateId ? "Guardar cambios" : "Nuevo gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          onChange={handleChange}
          value={expense.expenseName}
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          value={expense.amount}
          placeholder="Añade la cantidad del gasto: ej. 300"
          className="bg-slate-100 p-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={expense.category}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha:
        </label>
        <DatePicker
          id="date"
          name="date"
          className="bg-slate-100 p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 duration-300 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
      >
        {state.updateId ? "Guardar cambios" : "Registrar gasto"}
      </button>
    </form>
  );
};
