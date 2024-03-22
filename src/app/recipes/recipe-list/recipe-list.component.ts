import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../../models/Recipe";
import { RecipeService } from '../recipe.service';
import { Observable, Subscription } from 'rxjs';
import { RecipeChangedArg } from '../recipeChangedArg';
import { ChangeMode } from '../changeMode';
import { RecipeState } from '../store/recipe.reducer';
import { Store } from '@ngrx/store';
import { RecipeActions } from '../store/recipe.actions';
import { AppState } from '../../shopping-list/shopping-list.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Observable<Recipe[]>
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<RecipeState>) {

  }

  async ngOnInit() {
    this.recipes = this.store.select("recipes");

    const recipes = this.recipeService.getRecipes();
    const tmp = { recipes: await recipes };

    this.store.dispatch(RecipeActions.init(tmp));

    /*

    this.subscription = this.recipeService.recipesChanged.subscribe((arg: RecipeChangedArg) => {
      switch (arg.mode) {
        case ChangeMode.Add:
         // this.recipes.push(<Recipe>arg.recipe);

          break;
        case ChangeMode.Update:
        //  let updateIndex = this.recipes.findIndex(r => r.id == (<Recipe>arg.recipe).id)
          //this.recipes[updateIndex] = <Recipe>arg.recipe;

          break;
        case ChangeMode.Delete:
         // let deletionIndex = this.recipes.findIndex(r => r.id == arg.recipe)
//          this.recipes.splice(deletionIndex, 1);

          break;
        case ChangeMode.All:
  //        this.recipes = <Recipe[]>arg.recipe;

          break;
      }
    });
    */
  }

  toggleFilter(value) {
    this.recipeService.listAllRecipes = value;

    this.recipeService.emitListAllRecipesChanged();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
