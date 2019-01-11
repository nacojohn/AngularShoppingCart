import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  itemIndex: number;
  edittingItem: Ingredient;
  @ViewChild('formIngredient') ingredientForm;

	addIngredient(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.onUpdateIngredient(this.itemIndex, newIngredient);
    } else {
      this.shoppingListService.onAddIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
	}

  deleteIngredient() {
    if(this.editMode) {
      this.shoppingListService.removeIngredient(this.itemIndex);
      this.clearForm();
    }
  }

  clearForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.edittingItem = this.shoppingListService.getIngredient(this.itemIndex);
        this.ingredientForm.setValue({
          "name": this.edittingItem.name,
          "amount": this.edittingItem.amount
        })
      }
    );
  }

  ngOnDestroy() {

  }

}
