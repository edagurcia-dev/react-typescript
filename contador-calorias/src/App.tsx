import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList, CalorieTracker, Form } from "./components";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg uppercase font-bold text-white">
            Contador de calorias
          </h1>

          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-900 text-white uppercase font-bold p-2 cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
