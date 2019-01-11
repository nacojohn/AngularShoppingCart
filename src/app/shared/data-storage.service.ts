import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    // const headers = new HttpHeaders().set('Authorization', 'Bearer adlfdj');

    // return this.httpClient.put('https://ng-recipe-book-ac2f0.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    // return this.httpClient.put('https://ng-recipe-book-ac2f0.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-ac2f0.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true
    });

    return this.httpClient.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    // this.httpClient.get<Recipe[]>("https://ng-recipe-book-ac2f0.firebaseio.com/recipes.json?auth=" + token).map(
    this.httpClient.get<Recipe[]>("https://ng-recipe-book-ac2f0.firebaseio.com/recipes.json", {
      observe: 'body',
      responseType: 'json', //blob, text, json
    })
      .map(
        (recipes) => {
          console.log(recipes)
          for(let recipe of recipes) {
            if(!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
          // return [];
        }
      ).subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes)
        }
      );
  }
}
