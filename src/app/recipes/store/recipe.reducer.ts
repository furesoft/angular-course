import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../../models/Recipe";
import { RecipeActions } from "./recipe.actions";

const initialState: RecipeState = {
    recipes: []
}

export interface RecipeState {
    recipes: Recipe[];
}

export const recipeReducer = createReducer(initialState,
    on(RecipeActions.init, (state, action) => ({ recipes: action.recipes })),
    on(RecipeActions.edit, (state, action) => editRecipe([...state.recipes], action.recipe)),
    on(RecipeActions.add, (state, action) => ({ recipes: [...state.recipes, action.recipe] })),
    on(RecipeActions.delete, (state, action) => deleteRecipe([...state.recipes], action.id))
);

function editRecipe(recipes: Recipe[], editedRecipe: Recipe) {
    let recipeIndex = findRecipeIndexById(recipes, editedRecipe.id);


    recipes[recipeIndex] = editedRecipe;

    return {
        recipes
    };
}

function findRecipeIndexById(recipes: Recipe[], id: string) {
    return recipes.findIndex(recipe => recipe.id == id);
}

function deleteRecipe(recipes: Recipe[], id: string): RecipeState {
    let recipeIndex = findRecipeIndexById(recipes, id);

    recipes.splice(recipeIndex, 1);

    return ({ recipes });
}
