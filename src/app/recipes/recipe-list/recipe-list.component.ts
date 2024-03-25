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
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>

  constructor(private recipeService: RecipeService, private store: Store<RecipeState>) {

  }

  async ngOnInit() {
    this.recipes = this.store.select("recipes");

    const recipes = this.recipeService.getRecipes();
    const tmp = { recipes: await recipes };

    this.store.dispatch(RecipeActions.init(tmp));
  }

  toggleFilter(value) {
    this.recipeService.listAllRecipes = value;
  }
}
