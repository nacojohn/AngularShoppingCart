import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
  recipeID: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeID = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.recipeID);
      }
    )
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    if(confirm("Are you sure to delete Recipe?")) {
      this.recipeService.removeRecipe(this.recipeID);

      this.router.navigate(['/recipes'])
    }
  }
}
