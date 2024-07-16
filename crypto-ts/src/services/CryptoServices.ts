import axios from "axios";
import {
  CryptoCurreniesyResponseSchema,
  CryptoPriceSchema,
} from "../schemas/crypto-schema";
import { PairT } from "../types";

export async function getCryptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  const {
    data: { Data },
  } = await axios.get(url);

  const res = CryptoCurreniesyResponseSchema.safeParse(Data);

  if (res.success) {
    return res.data;
  }
}

export async function getCryptoData(pair: PairT) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`;
  const {
    data: { DISPLAY },
  } = await axios.get(url);

  const res = CryptoPriceSchema.safeParse(
    DISPLAY[pair.cryptoCurrency][pair.currency]
  );

  if (res.success) {
    return res.data;
  }
}
