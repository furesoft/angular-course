import { Injectable } from "@angular/core";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";
import { RecordService } from "pocketbase";
import { EnvironmentService } from "../shared/environment.service";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<void>();
    startedEditing = new Subject<string>();

    private collection: RecordService<Ingredient>;

    constructor(environment: EnvironmentService) {
        this.collection = environment.pb.collection("shopping_list");        
    }

    async getIngredients() {
        return await this.collection.getFullList();
    }

    async addIngredient(ingredient: Ingredient) {
        try {
            let filteredIngredient = await this.collection.getOne(ingredient.id);
            ingredient.amount += filteredIngredient.amount;
        }
        catch (ex) {
            this.collection.create(ingredient);
        }

        this.ingredientsChanged.next();
    }

    async getIngredient(id: string) {
        return await this.collection.getOne(id);
    }

    addIngredientsFromRecipe(recipe: Recipe) {
        for (let ingredient of recipe.ingredients) {
            this.addIngredient(ingredient);
        }

        this.emitChanged();
    }

    emitChanged() {
        this.ingredientsChanged.next();
    }

    async clear() {
        let ingredients = await this.getIngredients();

        for (const ingredient of ingredients) {
            this.collection.delete(ingredient.id);
        }

        this.emitChanged();
    }

    updateIngredient(ingredient: Ingredient) {
        this.collection.update(ingredient.id, ingredient);

        this.emitChanged();
    }

    delete(id: string) {
       this.collection.delete(id);

        this.emitChanged();
    }
}