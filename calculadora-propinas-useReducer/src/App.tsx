import { useReducer } from "react";
import { orderReducer, initialState } from "./reducers/order-reducer";
import { MenuItem, OrderContent, OrderTips, OrderTotals } from "./components";
import { menuItems } from "./data/db";

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center font-bold text-4xl">
          Calculadora de propinas y consumo
        </h1>
      </header>

      <main className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5 mt-5">
        <div className="py-5">
          <h2 className="text-2xl font-black">Menú</h2>

          <div className="space-y-2 mt-2">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 rounded-lg p-5 space-y-10">
          {state.order.length === 0 ? (
            <p className="text-center">La order esta vacia</p>
          ) : (
            <>
              <OrderContent order={state.order} dispatch={dispatch} />
              <OrderTips tip={state.tip} dispatch={dispatch} />
              <OrderTotals
                order={state.order}
                tip={state.tip}
                dispatch={dispatch}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
