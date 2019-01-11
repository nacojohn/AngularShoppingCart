import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeID: number;
  editMode = false;
  myForm: FormGroup;
  currentRecipe: Recipe;
  imageURL: string;

  get formData() {
    return <FormArray>this.myForm.get('ingredients');
  }

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.recipeID = +params['id'];

        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName, recipeDesc, recipeImage = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const currentRecipe = this.recipeService.getRecipeById(this.recipeID);

      recipeName = currentRecipe.name;
      recipeDesc = currentRecipe.description;
      recipeImage = currentRecipe.imagePath;
      if(currentRecipe['ingredients']) {
        for(let ingredient of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.myForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmitForm() {
    // const newRecipe: Recipe = new Recipe(
    //   this.myForm.value['name'],
    //   this.myForm.value['desc'],
    //   this.myForm.value['imagePath'],
    //   this.myForm.value['ingredients']
    // );
    if(this.editMode) {
      this.recipeService.updateRecipe(this.recipeID, this.myForm.value);
    } else {
      this.recipeService.addRecipe(this.myForm.value);
    }

    this.router.navigate(['/recipes']);
  }

  addNewIngredient() {
    const control  = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.myForm.get('ingredients')).push(control);
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

  removeIngredient(index: number) {
    (<FormArray>this.myForm.get('ingredients')).removeAt(index);
  }

}
