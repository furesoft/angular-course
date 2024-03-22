import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs-compat';
import { addIngredientAction, startEditAction } from './store/shopping-list.actions';
import { RecipeState as RecipesState } from '../recipes/store/recipe.reducer';

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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;
  private ingredientsChangedSubscripion: Subscription;

  constructor(private shoppingListService: ShoppingListService, private environment: AuthService,
    private store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscripion.unsubscribe();
  }

  shoppingItemCreated(ingredient: Ingredient) {
    this.store.dispatch(addIngredientAction({ ingredient: ingredient }));
  }

  ngOnInit() {
    this.environment.redirectIfNotLoggedIn();

    this.ingredients = this.store.select('shoppingList');

    this.shoppingListService.getIngredients().then(ingredients => {
      //this.ingredients = ingredients;
    });

    this.ingredientsChangedSubscripion = this.shoppingListService.ingredientsChanged.subscribe(() => {
      this.shoppingListService.getIngredients().then(ingredients => {
        //this.ingredients = ingredients;
      });
    });
  }

  onEditItem(id: number) {
    this.store.dispatch(startEditAction({editedIngredientIndex: id}));
  }
}
