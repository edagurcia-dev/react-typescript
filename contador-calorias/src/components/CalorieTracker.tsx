import { useMemo } from "react";
import type { ActivityT } from "../types";
import { CalorieDisplay } from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: ActivityT[];
};

export const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

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
