import { EventEmitter, Injectable, Output } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe("A Test Recipe1", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Meat", 1, "Stk")]),
        new Recipe("A Test Recipe2", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Fries", 20, "Stk")]),
        new Recipe("A Test Recipe3", "This is a test", "https://www.shutterstock.com/shutterstock/photos/370298699/display_1500/stock-photo-notepad-for-your-recipe-with-herbs-and-spices-over-black-stone-background-top-view-with-copy-space-370298699.jpg", [new Ingredient("Banana", 4, "Stk")]),
    ];

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
        return this.recipes.slice();
    }
}