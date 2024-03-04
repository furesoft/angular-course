import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

  }
  
  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.id = params["id"];
      this.recipe = await this.recipeService.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    this.shoppingListService.addIngredientsFromRecipe(this.recipe);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);

    this.router.navigate(["/recipes"]);
  }
}
