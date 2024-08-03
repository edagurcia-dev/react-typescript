import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import { DrinkCard } from "../components/DrinkCard";

export const IndexPage = () => {
  const recipes = useAppStore((state) => state.recipes);

  const hasDrinks = useMemo(() => recipes.drinks.length !== 0, [recipes]);
  return (
    <>
      {hasDrinks && <h1 className="text-6xl font-extrabold">Recetas</h1>}

      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recipes.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <>
          <p className="my-10 text-center text-2xl">
            No hay recetas aún, utiliza el filtro de busquedas.
          </p>
        </>
      )}
    </>
  );
};
