import { FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);

  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "add-budget", payload: { budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
        <input
          type="number"
          id="budgetId"
          name="budget"
          placeholder="Define tu presupuesto"
          className="w-full border border-gray-200 p-2"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 duration-300 font-black uppercase p-2 w-full text-white disabled:opacity-40"
        disabled={isValid}
      >
        Definir presupuesto
      </button>
    </form>
  );
};
