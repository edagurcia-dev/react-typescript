import { useActivity } from "../hooks/useActivity";
import { CalorieDisplay } from "./CalorieDisplay";

export const CalorieTracker = () => {
  const { caloriesBurned, caloriesConsumed, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-center text-white font-black text-4xl">
        Resumen de calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay text="Consumidas" calories={caloriesConsumed} />
        <CalorieDisplay text="Quemadas" calories={caloriesBurned} />
        <CalorieDisplay text="Diferencia" calories={netCalories} />
      </div>
    </>
  );
};
