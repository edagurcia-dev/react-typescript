import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/RecipeService";
import {
  CategoriesT,
  SearchFilterT,
  RecipesT,
  DrinkT,
  RecipeT,
} from "../types";

export type ReceipesSliceT = {
  categories: CategoriesT;
  recipes: RecipesT;
  selectedRecipe: RecipeT;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilterT) => Promise<void>;
  selectRecipe: (id: DrinkT["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipesSlice: StateCreator<ReceipesSliceT> = (set) => ({
  categories: {
    drinks: [],
  },
  recipes: {
    drinks: [],
  },
  selectedRecipe: {} as RecipeT,
  modal: false,

  fetchCategories: async () => {
    const categories = await getCategories();

    set({
      categories,
    });
  },
  searchRecipes: async (filters) => {
    const recipes = await getRecipes(filters);
    set({
      recipes,
    });
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);

    set({
      selectedRecipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as RecipeT,
    });
  },
});
