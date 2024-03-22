import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../shopping-list.component';
import { shoppingListActions } from '../store/shopping-list.actions';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean;
  editedItemId: string;
  editedItem: Ingredient;

  @ViewChild("f") form: NgForm;

  constructor(private authService: AuthService, private store: Store<AppState>) {

  }

  ngOnDestroy(): void {
    this.store.dispatch(shoppingListActions.stopEditAction());
  }

  ngOnInit() {
    this.store.select("shoppingList").subscribe((state) => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = state.editedIngredient;

        this.form.setValue({ id: this.editedItem.id, name: this.editedItem.name, amount: this.editedItem.amount, metric: this.editedItem.metric });
      }
      else {
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient: Ingredient = form.value;
    newIngredient.createdBy = this.authService.getLoggedInUser().id;

    if (!this.editMode) {
      this.store.dispatch(shoppingListActions.addIngredientAction({ ingredient: newIngredient }));
    }
    else {
      this.store.dispatch(shoppingListActions.updateIngredientAction({ ingredient: newIngredient }));
    }

    this.resetForm();
  }

  private resetForm() {
    this.form.reset();

    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(shoppingListActions.deleteIngredientAction({ ingredient: this.editedItem }));

    this.resetForm();
  }

  clear() {
    this.store.dispatch(shoppingListActions.stopEditAction());

    this.resetForm();
  }
}
