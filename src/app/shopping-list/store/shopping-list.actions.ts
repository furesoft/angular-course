import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../models/Ingredient";

export const shoppingListActions = {
    addIngredientAction: createAction("[shopping-list] AddIngredient", props<{ ingredient: Ingredient }>()),
    deleteIngredientAction: createAction("[shopping-list] DeleteIngredient", props<{ ingredient: Ingredient }>()),
    updateIngredientAction: createAction("[shopping-list] UpdateIngredient", props<{ ingredient: Ingredient }>()),
    startEditAction: createAction("[shopping-list] StartEdit", props<{ editedIngredientIndex: number }>()),
    stopEditAction: createAction("[shopping-list] StopEdit"),
    fetch: createAction("[shopping-list] Fetch"),
    init: createAction("[shopping-list] Init", props<{ingredients: Ingredient[]}>())
}