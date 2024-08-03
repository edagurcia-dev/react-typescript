import { StateCreator } from "zustand";
import { RecipeT } from "../types";

type NotificationT = {
  text: string;
  error: boolean;
  show: boolean;
};

export type FavoritesSliceType = {
  notification: NotificationT;
  favorites: RecipeT[];
  handleClickFavorite: (recipe: RecipeT) => void;
  favoriteExists: (id: RecipeT["idDrink"]) => boolean;
  loadFavoritesFromLocal: () => void;
  showNotification: (payload: Pick<NotificationT, "text" | "error">) => void;
  closeNotification: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  favorites: [],
  favoriteExists: (id) => {
    return get().favorites.some((fav) => fav.idDrink === id);
  },
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (fav) => fav.idDrink !== recipe.idDrink
        ),
      }));
      get().showNotification({ text: "Se eliminó de favoritos", error: false });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      get().showNotification({ text: "Se agregó a favoritos", error: false });
    }
    sessionStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  loadFavoritesFromLocal: () => {
    const localFavs = sessionStorage.getItem("favorites");

    if (localFavs) {
      set({
        favorites: JSON.parse(localFavs),
      });
    }
  },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().closeNotification();
    }, 2500);
  },
  closeNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
