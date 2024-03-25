import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { shoppingListActions } from './shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListEffects {
    constructor(private actions$: Actions, private shoppingListService: ShoppingListService) { }

    fetch = createEffect(() => this.actions$.pipe(
        ofType(shoppingListActions.fetch),
        switchMap(async () => {
            let ingredients = await this.shoppingListService.getIngredients()

            return shoppingListActions.init({ ingredients: ingredients });
        })));

        deleteIngredient = this.actions$.pipe(
            ofType(shoppingListActions.deleteIngredientAction),
            tap(action => {
                this.shoppingListService.delete(action.ingredient.id);
            })
        );

    updateIngredientAction = this.actions$.pipe(
        ofType(shoppingListActions.updateIngredientAction),
        tap(s => {
            this.shoppingListService.updateIngredient(s.ingredient);
        })
    );

    addIngredientAction = this.actions$.pipe(
        ofType(shoppingListActions.addIngredientAction),
        tap(s => {
            this.shoppingListService.addIngredient(s.ingredient);
        })
    );
}