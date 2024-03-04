import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { Subject } from "rxjs";
import { EnvironmentService } from "../shared/environment.service";
import { RecordService } from "pocketbase";

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
        let tmp = this.collection.create(recipe);

        this.recipesChanged.next();

        return tmp;
    }

    updateRecipe(recipe: Recipe) {
        this.collection.update(recipe.id, recipe)

        this.recipesChanged.next();
    }

    deleteRecipe(id: string) {
        this.collection.delete(id);

        this.recipesChanged.next();
    }
}