import { z } from "zod";

// ZOD ayuda a trabajar con APIs para asegurar el tipeado de los resultados
export const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});
