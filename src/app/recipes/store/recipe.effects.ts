import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecipeService } from "../recipe.service";
import { switchMap, tap } from "rxjs/operators";
import { RecipeActions } from "./recipe.actions";
import { Router } from "@angular/router";


@Injectable()
export class RecipeEffects {
    constructor(
        private actions: Actions,
        private recipeService: RecipeService, private router: Router
    ) {

    }

    editRecipe = createEffect(() => this.actions.pipe(
        ofType(RecipeActions.edit),
        tap((r) => this.recipeService.updateRecipe(r.recipe))),
        { dispatch: false });

    deleteRecipe = createEffect(() => this.actions.pipe(
        ofType(RecipeActions.delete),
        tap(r => this.recipeService.deleteRecipe(r.id)),
        tap((t) => {
            this.router.navigate(["/recipes"]);
        })
    ), { dispatch: false });

    addRecipe = createEffect(() => this.actions.pipe(
        ofType(RecipeActions.add),
        switchMap(r => this.recipeService.addRecipe(r.recipe)),
        tap(r => {
            this.router.navigate(["recipes", r.id]);
        })
    ), {dispatch: false});
}