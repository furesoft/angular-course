import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;

      this.initForm();
    });
  }

  private initForm() {
    let recipe: Recipe = null;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(this.getNewIngredientFormGroup(ingredient));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.editMode ? recipe.name : null, Validators.required),
      'description': new FormControl(this.editMode ? recipe.description : null, Validators.required),
      'imgPath': new FormControl(this.editMode ? recipe.imagePath : null, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  private getNewIngredientFormGroup(ingredient: Ingredient): any {
    return new FormGroup({
      'name': new FormControl(ingredient.name, Validators.required),
      'amount': new FormControl(ingredient.amount, Validators.required),
      'metric': new FormControl(ingredient.metric, Validators.required),
    });
  }

  onSubmit() {
    let recipe = this.recipeForm.value;

    if (!this.editMode) {
      this.recipeService.addRecipe(recipe);
    }
    else {
      this.recipeService.updateRecipe(this.id, recipe);
    }

    if (Number.isNaN(this.id)) {
      this.id = this.recipeService.getRecipes().length - 1;
      this.router.navigate(["../", this.id], { relativeTo: this.route });
    }
    else {
      this.router.navigate(["../"], { relativeTo: this.route });
    }

  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(this.getNewIngredientFormGroup(new Ingredient(null, null, null)));
  }
}
