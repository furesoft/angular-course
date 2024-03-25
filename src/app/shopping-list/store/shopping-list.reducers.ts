import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../models/Ingredient";
import { shoppingListActions } from "./shopping-list.actions";
import { ShoppingListState } from "../shopping-list.component";

const initialState: ShoppingListState = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(initialState,
    on(shoppingListActions.addIngredientAction, (state, action) => ({ ...state, ingredients: [...state.ingredients, action.ingredient] })), // neue Ingredoiients zum State hinzufügen
    on(shoppingListActions.deleteIngredientAction, (state, action) => deleteIngredient(state, action)),
    on(shoppingListActions.updateIngredientAction, (state, action) => updateIngredient(state, [...state.ingredients], action)),
    on(shoppingListActions.startEditAction, (state, action) => 
            ({ ...state, editedIngredient: state.ingredients[action.editedIngredientIndex], editedIngredientIndex: action.editedIngredientIndex })), // Ausgewähltes Ingredient aus UI in State schreieben
    on(shoppingListActions.stopEditAction, (state, action) => ({ ...state, editedIngredient: null, editedIngredientIndex: -1 })),
    on(shoppingListActions.init, (state, action) => ({...state, ingredients: action.ingredients})), // Ingredients von außerhalb setzen
);

function updateIngredient(state: ShoppingListState, ingredients: Ingredient[], action: { ingredient: Ingredient }) {
    let index = ingredients.findIndex((currentValue, index, arr) => currentValue.id == action.ingredient.id);

    ingredients[index] = action.ingredient;

    return {...state, ingredients: ingredients};
}

function deleteIngredient(state: ShoppingListState, action: { ingredient: Ingredient }) {
    let index = state.ingredients.findIndex((currentValue, index, arr) => currentValue.id == action.ingredient.id);

    state.ingredients.splice(index, 1)

    return state;
}