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
    on(shoppingListActions.addIngredientAction, (state, action) => ({ ...state, ingredients: [...state.ingredients, action.ingredient] })),
    on(shoppingListActions.deleteIngredientAction, (state, action) => ({ ...state, ingredients: [...state.ingredients.splice(0, 1, action.ingredient)] })),
    on(shoppingListActions.updateIngredientAction, (state, action) => updateIngredient(state, action)),
    on(shoppingListActions.startEditAction, (state, action) => 
            ({ ...state, editedIngredient: state.ingredients[action.editedIngredientIndex], editedIngredientIndex: action.editedIngredientIndex })),
    on(shoppingListActions.stopEditAction, (state, action) => ({ ...state, editedIngredient: null, editedIngredientIndex: -1 }))
);

function updateIngredient(state: ShoppingListState, action: { ingredient: Ingredient }) {
    let index = state.ingredients.findIndex((currentValue, index, arr) => currentValue.id = action.ingredient.id, this);

    state.ingredients[index] = action.ingredient;

    return state;
}