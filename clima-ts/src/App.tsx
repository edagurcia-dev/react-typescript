import { useWeather } from "./hooks/useWeather";
import { Alert, Form, Spinner, WeatherDetail } from "./components";
import styles from "./App.module.css";

function App() {
  const { weather, hastWeatherData, isLoading, notFound, fetchWeather } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {isLoading && <Spinner />}
        {hastWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
