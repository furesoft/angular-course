import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecordService } from "pocketbase";
import { RecipeChangedArg } from "./recipeChangedArg";
import { ChangeMode } from "./changeMode";
import { User } from "../models/User";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<RecipeChangedArg>();
    collection: RecordService<Recipe>;
    public listAllRecipes: boolean = true;

    constructor(private auth: AuthService) {
        this.collection = auth.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        let user = this.auth.getUser();;

        if(this.listAllRecipes) {
            return await this.collection.getFullList();
        }

        return await this.collection.getFullList( { filter: `createdBy = '${user.id}'`});
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