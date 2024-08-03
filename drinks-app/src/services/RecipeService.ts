import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  RecipesAPIResponseSchema,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schemas";
import { SearchFilterT } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios.get(url);
  const res = CategoriesAPIResponseSchema.safeParse(data);

  if (res.success) {
    return res.data;
  }
}

export async function getRecipes(filters: SearchFilterT) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await axios.get(url);
  const res = RecipesAPIResponseSchema.safeParse(data);

  if (res.success) {
    return res.data;
  }
}

export async function getRecipeById(id: string) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios.get(url);
  const res = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

  if (res.success) {
    return res.data;
  }
}
