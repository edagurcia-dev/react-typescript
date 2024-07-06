import { WeatherT } from "../../hooks/useWeather";
import { formatTemp } from "../../helpers";
import style from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: WeatherT;
};

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {
  return (
    <div className={style.container}>
      <h2>{weather.name}</h2>

      <p className={style.current}>{formatTemp(weather.main.temp)} &deg;C</p>
      <div className={style.temperatures}>
        <p>
          min <span>{formatTemp(weather.main.temp_min)} &deg;C</span>
        </p>
        <p>
          max <span>{formatTemp(weather.main.temp_max)} &deg;C</span>
        </p>
      </div>
    </div>
  );
};
