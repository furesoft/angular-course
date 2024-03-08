import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangedSubscripion: Subscription;

  constructor(private shoppingListService: ShoppingListService, private environment: AuthService) {

  }

  ngOnDestroy(): void {
    this.ingredientsChangedSubscripion.unsubscribe();
  }

  shoppingItemCreated(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnInit() {
    this.environment.redirectIfNotLoggedIn();

    this.shoppingListService.getIngredients().then(ingredients => {
      this.ingredients = ingredients;
    });

    this.ingredientsChangedSubscripion = this.shoppingListService.ingredientsChanged.subscribe(() => {
      this.shoppingListService.getIngredients().then(ingredients => {
        this.ingredients = ingredients;
      });
    });
  }

  onEditItem(id: string) {
    this.shoppingListService.startedEditing.next(id);
  }
}
