import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../../models/Recipe";
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Input() recipes: Recipe[]
  subscription: Subscription;

  constructor(private recipeService: RecipeService) {
    
  }
  
  async ngOnInit() {
    this.recipes = await this.recipeService.getRecipes();

   this.subscription = this.recipeService.recipesChanged.subscribe(async () => {
      this.recipes = await this.recipeService.getRecipes();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
