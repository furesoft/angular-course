import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { Subject } from "rxjs";
import { EnvironmentService } from "../shared/environment.service";
import { RecordService } from "pocketbase";

//ToDo: nicht immer die ganze liste übertragen sondern nur die geänderten rezepte. Hier führ eigene subjects erstellen oder ein ActionType enum
@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    collection: RecordService<Recipe>;

    constructor(private environment: EnvironmentService) {
        this.collection = environment.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        return await this.collection.getFullList();
    }

    async getRecipe(id: string) {
        return await this.collection.getOne(id);
    }

    addRecipe(recipe: Recipe) {
        this.collection.create(recipe).then(() => {
            this.recipesChanged.next();
        });
    }

    updateRecipe(recipe: Recipe) {
        this.collection.update(recipe.id, recipe)

        this.recipesChanged.next();
    }

    deleteRecipe(id: string) {
        this.collection.delete(id).then(()=> {
            this.recipesChanged.next();
        });

    }
}