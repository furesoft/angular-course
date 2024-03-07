import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../../models/Recipe";
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { RecipeChangedArg } from '../recipeChangedArg';
import { ChangeMode } from '../changeMode';

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

    this.subscription = this.recipeService.recipesChanged.subscribe((arg: RecipeChangedArg) => {
      if (arg.mode == ChangeMode.Add) {
        this.recipes.push(<Recipe>arg.recipe);
      }
      else if (arg.mode == ChangeMode.Update) {
        let index = this.recipes.findIndex(r => r.id == (<Recipe>arg.recipe).id)
        this.recipes[index] = <Recipe>arg.recipe;
      }
      else if (arg.mode == ChangeMode.Delete) {
        let index = this.recipes.findIndex(r => r.id == arg.recipe)
        this.recipes.splice(index, 1);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
