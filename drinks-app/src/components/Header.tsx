import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export const Header = () => {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const { pathname } = useLocation();

  const categories = useAppStore((state) => state.categories);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  const isHome = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="logo app" width={100} />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow-md space-y-4"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                onChange={handleChange}
                value={searchFilters.ingredient}
                className="p-3 w-full roun-lg focus:outline-none"
                placeholder="Nombre o Ingredientes. Eje: Tequila, Vodka, Ron"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={searchFilters.category}
                className="p-3 w-full roun-lg focus:outline-none"
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white rounded-lg font-extrabold w-full uppercase p-2 duration-300"
            >
              Buscar receta
            </button>
          </form>
        )}
      </div>
    </header>
  );
};
