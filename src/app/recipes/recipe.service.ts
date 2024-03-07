import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";
import { EnvironmentService } from "../shared/environment.service";
import { RecordService } from "pocketbase";
import { RecipeChangedArg } from "./RecipeChangedArg";
import { ChangeMode } from "./changeMode";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<RecipeChangedArg>();
    collection: RecordService<Recipe>;

    constructor(environment: EnvironmentService) {
        this.collection = environment.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        return await this.collection.getFullList();
    }

    async getRecipe(id: string) {
        return await this.collection.getOne(id);
    }

    addRecipe(recipe: Recipe) {
        this.collection.create(recipe).then((r) => {
            this.recipesChanged.next(new RecipeChangedArg(r, ChangeMode.Add));
        });
    }

    updateRecipe(recipe: Recipe) {
        this.collection.update(recipe.id, recipe)

        this.recipesChanged.next(new RecipeChangedArg(recipe, ChangeMode.Update));
    }

    deleteRecipe(id: string) {
        this.collection.delete(id).then(() => {
            this.recipesChanged.next(new RecipeChangedArg(id, ChangeMode.Delete));
        });
    }
}