import { useMemo } from "react";
import { useCryptoStore } from "../store";
import { Spinner } from "./Spinner";

export const CryptoPrice = () => {
  const { result, loading } = useCryptoStore();

  const hasResult = useMemo(
    () => !Object.values(result).includes(""),
    [result]
  );

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        hasResult && (
          <div className="result-wrapper">
            <h2>Cotización</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                alt=""
              />
              <div>
                <p>
                  El precio es de: <span>{result.PRICE}</span>
                </p>
                <p>
                  El precio màs alto del dìa: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  El precio màs bajo del dìa: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  Variaciòn ùltimas 24 hrs:{" "}
                  <span>{result.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Ùltima actualizaciòn: <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
