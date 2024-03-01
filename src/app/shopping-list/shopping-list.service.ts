import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);

        this.emitChanged();
    }

    addIngredientsFromRecipe(recipe: Recipe) {
        for (let ingredient of recipe.ingredients) {
            let fitleredIngredient = this.ingredients.filter(ingr => ingr.name === ingredient.name)[0];

            if (fitleredIngredient) {
                ingredient.amount += fitleredIngredient.amount;
            }
            else {
                this.ingredients.push(ingredient);
            }
        }

        this.emitChanged();
    }

    private emitChanged() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    clear() {
        this.ingredients = [];

        this.emitChanged();
    }
}