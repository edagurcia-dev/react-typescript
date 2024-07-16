import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCryptos, getCryptoData } from "./services/CryptoServices";
import { CryptoCurrencyT, PairT, CryptoPriceT } from "./types";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrencyT[];
  result: CryptoPriceT;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: PairT) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {
      IMAGEURL: "",
      PRICE: "",
      HIGHDAY: "",
      LOWDAY: "",
      CHANGEPCT24HOUR: "",
      LASTUPDATE: "",
    },
    loading: false,
    fetchCryptos: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({
        cryptoCurrencies,
      }));
    },
    fetchData: async (pair) => {
      const result = await getCryptoData(pair);
      set(() => ({
        loading: true,
      }));

      set(() => ({
        result,
      }));

      set(() => ({
        loading: false,
      }));
    },
  }))
);
