import { Injectable } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { AuthService } from "../auth/auth.service";
import { RecordService } from "pocketbase";

@Injectable()
export class RecipeService {
    collection: RecordService<Recipe>;

    constructor(private auth: AuthService) {
        this.collection = auth.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        return await this.collection.getFullList();
    }

    async getRecipe(id: string) {
        return await this.collection.getOne(id);
    }

    addRecipe(recipe: Recipe) {
        return this.collection.create(recipe);
    }

    updateRecipe(recipe: Recipe) {
        return this.collection.update(recipe.id, recipe);
    }

    deleteRecipe(id: string) {
        return this.collection.delete(id);
    }
}