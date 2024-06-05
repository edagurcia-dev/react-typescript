import { useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList, Form } from "./components";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg uppercase font-bold text-white">
            Contador de calorias
          </h1>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;