import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import { AmountDisplay } from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export const BudgetTracker = () => {
  const { state, totalExpenses, availableBudget, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          strokeWidth={2.5}
          styles={buildStyles({
            pathColor: percentage === 100 ? "#dc2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            textSize: 8,
            textColor: percentage === 100 ? "#dc2626" : "#3b82f6",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 hover:bg-pink-700 duration-300 text-white w-full p-2 rounded-lg font-bold"
          onClick={() => dispatch({ type: "reset-app" })}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={+state.budget} />

        <AmountDisplay label="Disponible" amount={availableBudget} />

        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
};
