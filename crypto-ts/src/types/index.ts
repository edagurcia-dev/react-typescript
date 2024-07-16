import { z } from "zod";
import {
  CurrencySchema,
  CryptoCurrencyResponseSchema,
  PairSchema,
  CryptoPriceSchema,
} from "../schemas/crypto-schema";

export type CurrencyT = z.infer<typeof CurrencySchema>;
export type CryptoCurrencyT = z.infer<typeof CryptoCurrencyResponseSchema>;
export type PairT = z.infer<typeof PairSchema>;
export type CryptoPriceT = z.infer<typeof CryptoPriceSchema>;
