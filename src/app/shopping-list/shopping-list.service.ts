import { Injectable } from "@angular/core";
import { Ingredient } from "../models/Ingredient";
import { Recipe } from "../models/Recipe";
import { Subject } from "rxjs";
import { RecordService } from "pocketbase";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<void>();
    startedEditing = new Subject<string>();

    private collection: RecordService<Ingredient>;

    constructor(private auth: AuthService) {
        this.collection = auth.pb.collection("shopping_list");
    }

    async getIngredients() {
        let user = this.auth.getUser();

        return await this.collection.getFullList({ filter: `createdBy = '${user.id}'` });
    }

    addIngredient(ingredient: Ingredient) {
        let user = this.auth.getUser();

        this.collection.getFirstListItem(`name = '${ingredient.name}' && createdBy = '${user.id}'`).then(filteredIngredient => {
            filteredIngredient.amount += ingredient.amount;

            this.updateIngredient(filteredIngredient);
        }).catch(() => {
            this.collection.create(ingredient);
        });

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

    clear() {
        this.getIngredients().then(ingredients => {
            for (const ingredient of ingredients) {
                this.collection.delete(ingredient.id);
            }
        }).then(() => {
            this.emitChanged();
        });;
    }

    updateIngredient(ingredient: Ingredient) {
        this.collection.update(ingredient.id, ingredient).then(() => {
            this.emitChanged();
        });
    }

    delete(id: string) {
        this.collection.delete(id).then(() => {
            this.emitChanged();
        });
    }
}