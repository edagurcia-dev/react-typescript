import { z } from "zod";

export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const CryptoCurrencyResponseSchema = z.object({
  CoinInfo: z.object({
    Name: z.string(),
    FullName: z.string(),
  }),
});

export const CryptoCurreniesyResponseSchema = z.array(
  CryptoCurrencyResponseSchema
);

export const PairSchema = z.object({
  currency: z.string(),
  cryptoCurrency: z.string(),
});

export const CryptoPriceSchema = z.object({
  IMAGEURL: z.string(),
  PRICE: z.string(),
  HIGHDAY: z.string(),
  LOWDAY: z.string(),
  CHANGEPCT24HOUR: z.string(),
  LASTUPDATE: z.string(),
});
