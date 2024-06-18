import { useReducer, useEffect } from "react";
import { cartReducer, initialState } from "./reducers/cart-reducer";
import { Footer, Guitar, Header } from "./components";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
