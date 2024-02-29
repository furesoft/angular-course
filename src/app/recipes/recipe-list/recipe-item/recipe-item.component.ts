import { Component, Input } from '@angular/core';
import { Recipe } from "../../../models/Recipe";
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {

  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}