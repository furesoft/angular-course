import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private environment: AuthService) {

  }

  ngOnInit(): void {
    this.environment.redirectIfNotLoggedIn();
  }
}
