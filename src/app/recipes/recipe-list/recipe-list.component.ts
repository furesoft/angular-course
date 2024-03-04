import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "../../models/Recipe";
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[]

  constructor(private recipeService: RecipeService) {
    
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
  }
}
