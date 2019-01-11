import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService: ShoppingListService) { }

  private recipes: Recipe[] = [
		new Recipe(
      'A Test Recipe',
      'This is a simple test',
      'http://www.seriouseats.com/recipes/assets_c/2015/01/20150119-pressure-cooker-chicken-stew-food-lab-11-thumb-1500xauto-418088.jpg',
      [
        new Ingredient('Chicken', 3),
        new Ingredient('Sweet Corn', 2)
      ]
    ),
		new Recipe(
      'My 2nd Recipe',
      'This is another recipe test',
      'http://del.h-cdn.co/assets/17/34/980x490/landscape-1503418862-chicken-thighs-delish.jpg',
      [
        new Ingredient('Beef', 10),
        new Ingredient('Rice', 2)
      ]
    ),
		new Recipe(
      'My 3rd Recipe',
      'This is another recipe test for 3rd Item',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/29/0/0149359_Making-Taco_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371603491866.jpeg',
      [
        new Ingredient('Tomatoes', 5),
        new Ingredient('Beef', 2)
      ]
    ),
		new Recipe(
      'My 4th Recipe',
      'This is another recipe test for 4th Item',
      'http://www.seriouseats.com/recipes/assets_c/2016/12/20161201-crispy-roast-potatoes-29-thumb-1500xauto-435281.jpg',
      [
        new Ingredient('Plantain', 10),
        new Ingredient('Ground Oil', 1)
      ]
    )
	];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
