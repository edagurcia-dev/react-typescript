import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  SearchFilterSchema,
  RecipesAPIResponseSchema,
  DrinkAPISchema,
  RecipeAPIResponseSchema,
} from "../utils/recipes-schemas";

export type CategoriesT = z.infer<typeof CategoriesAPIResponseSchema>;

export type SearchFilterT = z.infer<typeof SearchFilterSchema>;

export type RecipesT = z.infer<typeof RecipesAPIResponseSchema>;

export type DrinkT = z.infer<typeof DrinkAPISchema>;

export type RecipeT = z.infer<typeof RecipeAPIResponseSchema>;
