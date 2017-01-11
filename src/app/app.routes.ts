// import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RECIPE_ROUTES} from './recipes/recipes.routes';

const APP_ROUTES_PROVIDERS: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES},
  { path: 'shopping-list', component: ShoppingListComponent},

  //{ path: 'user/:id', component: UserComponent, children: USER_ROUTES },
  //{ path: '', component: HomeComponent },
  //{ path: '**', redirectTo: '/user/1', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);
