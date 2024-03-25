import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs-compat';
import { RecipeState as RecipesState } from '../recipes/store/recipe.reducer';
import { shoppingListActions } from './store/shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingListState,
  recipes: RecipesState
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<ShoppingListState>;

  constructor(private shoppingListService: ShoppingListService, private environment: AuthService,
    private store: Store<AppState>) {
  }

  shoppingItemCreated(ingredient: Ingredient) {
    this.store.dispatch(shoppingListActions.addIngredientAction({ ingredient: ingredient }));
  }

  ngOnInit() {
    this.environment.redirectIfNotLoggedIn();

    this.ingredients = this.store.select('shoppingList');

    this.store.dispatch(shoppingListActions.fetch());
  }

  onEditItem(id: number) {
    this.store.dispatch(shoppingListActions.startEditAction({ editedIngredientIndex: id }));
  }
}
