import {Component, OnInit} from "@angular/core";

import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: 'recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  selectedIngredients: String[];
  filteredIngredientsMultiple: String[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }

  filterIngredientMultiple(event) {
    let query = event.query;
    //this.recipeService.getUniqueIngredients().then(ingredients => {
      this.filteredIngredientsMultiple = this.filterIngredient(query, this.recipeService.uniqueIngredients);
    //});
  }

  filterIngredient(query, ingredients: Ingredient[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < ingredients.length; i++) {
      let ingredient = ingredients[i];
      if(ingredient.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filtered.push(ingredient);
      }
    }
    return filtered;
  }

}
