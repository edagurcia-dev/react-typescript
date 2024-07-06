import { useMemo, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { SearchT } from "../types";
import { WeatherSchema } from "../schemas";

export type WeatherT = z.infer<typeof WeatherSchema>;

export const useWeather = () => {
  const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const inistialState = {
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  };

  const [weather, setWeather] = useState<WeatherT>(inistialState);

  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchT) => {
    const geoURL = `${BASE_URL}/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`;

    try {
      setIsLoading(true);
      setWeather(inistialState);
      setNotFound(false);

      const { data: geoData } = await axios.get(geoURL);

      if (!geoData[0]) {
        setNotFound(true);
        return;
      }

      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weather = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const { data: weatherData } = await axios.get(weather);

      const res = WeatherSchema.safeParse(weatherData);

      if (res.success) {
        setWeather(res.data);
      } else {
        console.error("Hubo un error al consultar el clima.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hastWeatherData = useMemo(() => weather.name, [weather]);

  return { weather, hastWeatherData, isLoading, notFound, fetchWeather };
};
