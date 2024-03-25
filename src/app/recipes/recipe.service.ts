import { Injectable } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { AuthService } from "../auth/auth.service";
import { RecordService } from "pocketbase";
import { Store } from "@ngrx/store";
import { RecipeState } from "./store/recipe.reducer";

@Injectable()
export class RecipeService {
    collection: RecordService<Recipe>;
    public listAllRecipes: boolean = true;

    constructor(private auth: AuthService, private store: Store<RecipeState>) {
        this.collection = auth.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        let user = this.auth.getLoggedInUser();

        if (this.listAllRecipes) {
            return await this.collection.getFullList();
        }

        return await this.collection.getFullList({ filter: `createdBy = '${user.id}'` });
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