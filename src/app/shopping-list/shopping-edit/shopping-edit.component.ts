import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;
  @ViewChild("metricInput") metricInput: ElementRef;


  constructor(private shoppingListService: ShoppingListService) {

  }

  onAdd() {
    let nameEl = <HTMLInputElement>this.nameInput.nativeElement;
    let amountEl = <HTMLInputElement>this.amountInput.nativeElement;
    let metricEl = <HTMLInputElement>this.metricInput.nativeElement;

    this.shoppingListService.addIngredient(new Ingredient(nameEl.value, parseInt(amountEl.value), metricEl.value));
  }

  clear() {
    this.shoppingListService.clear();
  }
}
