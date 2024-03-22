import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../models/Recipe";
import { loadRecipesAction, setRecipesAction } from "./recipe.actions";

const initialState: RecipeState = {
    recipes: []
}

export interface RecipeState {
    recipes: Recipe[];
}

export const recipeReducer = createReducer(initialState,
    on(setRecipesAction, (state, action) => ({ recipes: action.recipes })),
);