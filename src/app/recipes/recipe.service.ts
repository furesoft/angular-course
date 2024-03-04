import { Injectable } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe("A Test Recipe1", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Meat", 1, "Stk")]),
        new Recipe("A Test Recipe2", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Fries", 20, "Stk")]),
        new Recipe("A Test Recipe3", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Banana", 4, "Stk")]),
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);

        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;

        this.recipesChanged.next(this.recipes.slice());
    }
}