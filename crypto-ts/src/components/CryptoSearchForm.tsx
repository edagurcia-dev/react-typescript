import { useState, ChangeEvent, FormEvent } from "react";
import { useCryptoStore } from "../store";
import { PairT } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { currencies } from "../data";

export const CryptoSearchForm = () => {
  const [pair, setPair] = useState<PairT>({
    currency: "",
    cryptoCurrency: "",
  });

  const [error, setError] = useState("");

  const { cryptoCurrencies, fetchData } = useCryptoStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");

    fetchData(pair);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          value={pair.currency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cryptoCurrency">Crypto:</label>
        <select
          name="cryptoCurrency"
          id="cryptoCurrency"
          value={pair.cryptoCurrency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {cryptoCurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Cotizar</button>
    </form>
  );
};
