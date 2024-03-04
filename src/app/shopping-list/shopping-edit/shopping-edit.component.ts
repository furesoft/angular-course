import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: any;
  editMode: boolean;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild("f") form : NgForm;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);

      this.form.setValue({name: this.editedItem.name, amount: this.editedItem.amount, metric: this.editedItem.metric});
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, parseInt(value.amount), value.metric);

    if(!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);

      this.shoppingListService.emitChanged();
    }
    else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }

    this.resetForm();
  }

  private resetForm() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.delete(this.editedItemIndex);

    this.resetForm();
  }

  clear() {
    this.shoppingListService.clear();
  }
}
