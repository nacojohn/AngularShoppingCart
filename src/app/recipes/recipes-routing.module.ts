import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const recipesRoute: Routes = [
  { path: '', component: RecipesComponent, children:[
    {path: '', component: RecipeStartComponent },
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    {path: ':id', component: RecipeDetailComponent },
    {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoute)
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})

export class RecipesRoutingModule { }
