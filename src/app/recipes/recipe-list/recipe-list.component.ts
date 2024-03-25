import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../models/Recipe";
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { RecipeState } from '../store/recipe.reducer';
import { Store } from '@ngrx/store';
import { RecipeActions } from '../store/recipe.actions';

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

    this.store.dispatch(RecipeActions.fetch());
  }

  toggleFilter(value) {
    this.recipeService.listAllRecipes = value;
  }
}
