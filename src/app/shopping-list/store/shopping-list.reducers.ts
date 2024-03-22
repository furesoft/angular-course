import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../models/Ingredient";
import { addIngredientAction, deleteIngredientAction, startEditAction, stopEditAction, updateIngredientAction } from "./shopping-list.actions";
import { ShoppingListState } from "../shopping-list.component";

const initialState: ShoppingListState = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(initialState,
    on(addIngredientAction, (state, action) => ({ ...state, ingredients: [...state.ingredients, action.ingredient] })),
    on(deleteIngredientAction, (state, action) => ({ ...state, ingredients: [...state.ingredients.splice(0, 1, action.ingredient)] })),
    on(updateIngredientAction, (state, action) => updateIngredient(state, action)),
    on(startEditAction, (state, action) => 
            ({ ...state, editedIngredient: state.ingredients[action.editedIngredientIndex], editedIngredientIndex: action.editedIngredientIndex })),
    on(stopEditAction, (state, action) => ({ ...state, editedIngredient: null, editedIngredientIndex: -1 }))
);

function updateIngredient(state: ShoppingListState, action: { ingredient: Ingredient }) {
    let index = state.ingredients.findIndex((currentValue, index, arr) => currentValue.id = action.ingredient.id, this);

    state.ingredients[index] = action.ingredient;

    return state;
}