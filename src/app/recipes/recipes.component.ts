import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { EnvironmentService } from '../shared/environment.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private environment: EnvironmentService) {

  }

  ngOnInit(): void {
    this.environment.redirectIfNotLoggedIn();
  }
}
