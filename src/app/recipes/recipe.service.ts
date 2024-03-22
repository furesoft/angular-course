import { Injectable } from "@angular/core";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecordService } from "pocketbase";
import { RecipeChangedArg } from "./recipeChangedArg";
import { ChangeMode } from "./changeMode";
import { Store } from "@ngrx/store";
import { RecipeState } from "./store/recipe.reducer";
import { RecipeActions } from "./store/recipe.actions";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<RecipeChangedArg>();
    collection: RecordService<Recipe>;
    public listAllRecipes: boolean = true;

    emitListAllRecipesChanged() {
        this.getRecipes().then(recipes => {
            this.recipesChanged.next(new RecipeChangedArg(recipes, ChangeMode.All))
        });
    }

    constructor(private auth: AuthService, private store: Store<RecipeState>) {
        this.collection = auth.pb.collection<Recipe>("recipes");
    }

    async getRecipes() {
        let user = this.auth.getLoggedInUser();;

        if (this.listAllRecipes) {
            return await this.collection.getFullList();
        }

        return await this.collection.getFullList({ filter: `createdBy = '${user.id}'` });
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
    }

    deleteRecipe(id: string) {
        this.collection.delete(id).then(() => {
            this.recipesChanged.next(new RecipeChangedArg(id, ChangeMode.Delete));
        });
    }
}