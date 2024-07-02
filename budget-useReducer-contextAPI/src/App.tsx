import { useEffect, useMemo } from "react";
import {
  BudgetForm,
  BudgetTracker,
  ExpenseList,
  ExpenseModal,
  FilterByCategory,
} from "./components";
import { useBudget } from "./hooks/useBudget";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    sessionStorage.setItem("budget", state.budget.toString());
    sessionStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-4xl font-black text-white uppercase text-center">
          Planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-gray-50 mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}

        {isValidBudget && (
          <main className="max-w-3xl mx-auto py-10">
            <FilterByCategory />
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}
      </div>
    </>
  );
}

export default App;
