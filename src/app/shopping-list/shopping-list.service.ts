import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        let filteredIngredient = this.ingredients.filter(ingr => ingr.name === ingredient.name)[0];

        if (filteredIngredient) {
            ingredient.amount += filteredIngredient.amount;
        }
        else {
            this.ingredients.push(ingredient);
        }
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredientsFromRecipe(recipe: Recipe) {
        for (let ingredient of recipe.ingredients) {
           this.addIngredient(ingredient);
        }

        this.emitChanged();
    }

    emitChanged() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    clear() {
        this.ingredients = [];

        this.emitChanged();
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;

        this.emitChanged();
    }

    delete(index: number) {
        this.ingredients.splice(index, 1);

        this.emitChanged();
    }
}