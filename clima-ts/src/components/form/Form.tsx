import { useState, ChangeEvent, FormEvent } from "react";
import { SearchT } from "../../types";
import { Alert } from "../alert/Alert";
import styles from "./Form.module.css";
import { countries } from "../../data";

type FormProps = {
  fetchWeather: (search: SearchT) => Promise<void>;
};

export const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<SearchT>({
    city: "",
    country: "",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios.");
      return;
    }

    setAlert("");
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Eje: Bogota"
          value={search?.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          name="country"
          id="country"
          value={search?.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un país</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.submit}>
        Consultar clíma
      </button>
    </form>
  );
};
