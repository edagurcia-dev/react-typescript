import { useAppStore } from "../stores/useAppStore";
import { DrinkCard, Modal } from "../components";
import { useMemo } from "react";

export const Favorites = () => {
  const { favorites } = useAppStore();

  const hasFavorites = useMemo(() => favorites.length !== 0, [favorites]);

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <>
          <p className="my-10 text-center text-2xl">No hay favoritos aún.</p>
        </>
      )}

      <Modal />
    </>
  );
};
