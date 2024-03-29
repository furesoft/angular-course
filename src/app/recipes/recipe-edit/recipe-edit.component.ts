import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/Recipe';
import { Ingredient } from '../../models/Ingredient';
import { AuthService } from '../../auth/auth.service';
import { RecipeActions } from '../store/recipe.actions';
import { RecipeState } from '../store/recipe.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private store: Store<RecipeState>,
    private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;

      this.initForm();
    });
  }

  private async initForm() {
    let recipe: Recipe = null;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipe = await this.recipeService.getRecipe(this.id);

      let user = this.authService.getLoggedInUser();

      if (user.id != recipe.createdBy) {
        this.router.navigate([".."], { relativeTo: this.route });
      }

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(this.getNewIngredientFormGroup(ingredient));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(this.id),
      'name': new FormControl(this.editMode ? recipe.name : null, Validators.required),
      'description': new FormControl(this.editMode ? recipe.description : null, Validators.required),
      'imagePath': new FormControl(this.editMode ? recipe.imagePath : null, Validators.required),
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

  async onSubmit() {
    let recipe: Recipe = this.recipeForm.value;

    recipe.createdBy = this.authService.getLoggedInUser().id;

    if (!this.editMode) {
      this.store.dispatch(RecipeActions.add({ recipe: recipe }));
    }
    else {
      this.store.dispatch(RecipeActions.edit({ recipe: recipe }));
      
      this.onCancel();
    }
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(this.getNewIngredientFormGroup(new Ingredient(null, null, null)));
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
