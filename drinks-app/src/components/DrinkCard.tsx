import { useAppStore } from "../stores/useAppStore";
import type { DrinkT } from "../types";

type DrinkCardProps = {
  drink: DrinkT;
};

export const DrinkCard = ({ drink }: DrinkCardProps) => {
  const selectRecipe = useAppStore((state) => state.selectRecipe);

  return (
    <div className="border shadow-lg rounded">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:cursor-pointer hover:scale-125 transition-transform rotate-2 duration-300"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>

        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 p-3 font-bold text-white text-lg w-full"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver receta
        </button>
      </div>
    </div>
  );
};
