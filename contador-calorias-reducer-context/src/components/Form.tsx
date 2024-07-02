import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useActivity } from "../hooks/useActivity";
import type { ActivityT } from "../types";
import { categories } from "../data";

const initialState: ActivityT = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export const Form = () => {
  const { state, dispatch } = useActivity();

  const [activity, setActivity] = useState<ActivityT>(initialState);

  useEffect(() => {
    if (state.activityId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activityId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activityId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="bg-white space-y-5 p-10 shadow rounded-lg"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría
        </label>
        <select
          id="category"
          className="bg-white w-full border border-slate-300 p-2 rounded-lg"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="bg-white w-full border border-slate-300 p-2 rounded-lg"
          placeholder="Eje. Ejercicio, Jugo de naranja, Ensalada, Pesas, Comida, etc..."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          type="number"
          id="calories"
          className="bg-white w-full border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias Eje. 300 ó 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-slate-600 hover:bg-slate-800 p-2 w-full text-white font-bold uppercase disabled:bg-slate-300"
        disabled={!isValidActivity()}
      >
        {activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
      </button>
    </form>
  );
};
