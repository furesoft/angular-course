import { createAction, props } from "@ngrx/store";
import { Recipe } from "../../models/Recipe";

export const loadRecipesAction = createAction("[Recipe] LoadRecipes");
export const setRecipesAction = createAction("[Recipe] SetRecipes", props<{ recipes: Recipe[] }>());
export const addRecipeAction = createAction("[Recipe] Add");