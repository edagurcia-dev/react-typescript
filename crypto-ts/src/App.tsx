import { useEffect } from "react";
import { CryptoPrice, CryptoSearchForm } from "./components";
import { useCryptoStore } from "./store";

function App() {
  const { fetchCryptos } = useCryptoStore();

  useEffect(() => {
    fetchCryptos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Cryptomonedas</span>
        </h1>

        <div className="content">
          <CryptoSearchForm />
          <CryptoPrice />
        </div>
      </div>
    </>
  );
}

export default App;
