import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import "rxjs/add/operator/map";
import * as _ from "lodash";
import {Recipe} from "./recipe";


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  uniqueIngredients: any[] = [];
  private recipes: Recipe[];

  constructor(private http: Http) {
  }

  getRecipes() {
    this.fetchData();
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes.find(recipe => recipe.id == id)
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.fetchData();
    this.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        let maxRecipe: Recipe;
        let nextId: number;
        this.recipes = recipes;
        maxRecipe = _.maxBy(this.recipes, 'id');
        nextId = maxRecipe.id + 1;
        recipe.id = nextId;
        this.recipes.push(recipe);
      }
    );
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-cadaa.firebaseio.com/recipes.json', body, {headers: headers})
  }

  fetchData() {
    return this.http.get('https://recipe-book-cadaa.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          console.log(data);
          this.uniqueIngredients = this.getUniqueIngredients();
          this.recipesChanged.emit(this.recipes);
        }
      )
  }

  getUniqueIngredients() {
    let uniqueTemp: any[] = [];

     if (this.recipes.length !== 0) {
      this.recipes.forEach(recipe => {
        if ("ingredients" in recipe) {
          recipe.ingredients.forEach(ingredient => {
            let ingredientName: String = _.capitalize(ingredient.name);
            uniqueTemp.push({name: ingredientName});
          })
        }
      });
    }
    uniqueTemp = _.uniqBy(uniqueTemp, 'name');
    uniqueTemp = _.sortBy(uniqueTemp, 'name');
    return uniqueTemp;
  }

}
