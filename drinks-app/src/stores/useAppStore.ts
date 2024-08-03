import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, ReceipesSliceT } from "./recipesSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";

export const useAppStore = create<ReceipesSliceT & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
  }))
);
