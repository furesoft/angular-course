import { createAction, props } from "@ngrx/store";
import { Recipe } from "../../models/Recipe";

export let RecipeActions = {
    fetch: createAction("[Recipe] Fetch"),
    init: createAction("[Recipe] Init", props<{ recipes: Recipe[] }>()),
    add: createAction("[Recipe] Add", props<{recipe: Recipe}>()),
    edit: createAction("[Recipe] Edit", props<{recipe: Recipe}>()),
    delete: createAction("[Recipe] Delete", props<{id: string}>())
}