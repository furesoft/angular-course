import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {

  }

  addToShoppingList() {
    this.shoppingListService.addIngredientsFromRecipe(this.recipe);
  }
}
