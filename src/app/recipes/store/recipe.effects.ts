import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecipeService } from "../recipe.service";
import { loadRecipesAction, setRecipesAction } from "./recipe.actions";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { RecipeState } from "./recipe.reducer";

@Injectable()
export class RecipeEffects {
    constructor(
        private actions: Actions,
        private recipeService: RecipeService, private store: Store<RecipeState>
    ) { }

    loadRecipes = createEffect(() => this.actions.pipe(ofType(loadRecipesAction), tap(async action => {
        console.log(action);

        const recipes = this.recipeService.getRecipes();

        return setRecipesAction({ recipes: await recipes });
    })));
}