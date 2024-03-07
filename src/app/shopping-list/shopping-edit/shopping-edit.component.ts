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
  editedItemId: string;
  editedItem: Ingredient;

  @ViewChild("f") form : NgForm;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(async id => {
      this.editedItemId = id;
      this.editMode = true;
      this.editedItem = await this.shoppingListService.getIngredient(id);

      this.form.setValue({id: this.editedItem.id, name: this.editedItem.name, amount: this.editedItem.amount, metric: this.editedItem.metric});
    });
  }

  onSubmit(form: NgForm) {
    const ingredient: Ingredient = form.value;

    if(!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);

      this.shoppingListService.emitChanged();
    }
    else {
      this.shoppingListService.updateIngredient(ingredient);
    }

    this.resetForm();
  }

  private resetForm() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.delete(this.editedItemId);

    this.resetForm();
  }

  clear() {
    this.shoppingListService.clear();
  }
}
