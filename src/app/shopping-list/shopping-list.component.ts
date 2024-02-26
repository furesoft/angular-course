import { Component } from '@angular/core';
import { Ingredient } from '../models/Ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [new Ingredient("Apple", 5, "Stk"), new Ingredient("Banana", 2, "Stk")];
}
