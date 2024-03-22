import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;

  get IsOwning() {
    let user = this.authService.getLoggedInUser();

    return user.id == this.recipe.createdBy;
  }

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
    private recipeService: RecipeService, private router: Router, private authService: AuthService) {

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
