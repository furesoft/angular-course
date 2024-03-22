import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../models/Ingredient";

export const addIngredientAction = createAction("[shopping-list] AddIngredient", props<{ ingredient: Ingredient }>());
export const deleteIngredientAction = createAction("[shopping-list] DeleteIngredient", props<{ingredient: Ingredient}>())
export const updateIngredientAction = createAction("[shopping-list] UpdateIngredient", props<{ingredient: Ingredient}>())
export const startEditAction = createAction("[shopping-list] StartEdit", props<{editedIngredientIndex: number}>())
export const stopEditAction = createAction("[shopping-list] StopEdit")