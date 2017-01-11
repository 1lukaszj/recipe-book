import {Pipe, PipeTransform} from "@angular/core";
import {Recipe} from "./recipe";
import * as _ from "lodash";

@Pipe({
  name: 'ingredients',
  pure: false
})
export class IngredientsPipe implements PipeTransform {

  transform(recipes: Recipe[], args?: any): any {
    let recipesFiltered: Recipe[] = [];

    if (_.size(args) !== 0) {
      _.forEach(recipes, function (recipe: Recipe) {
        if ("ingredients" in recipe) {
          let matchingIngredientsCount: number = _.size(_.intersectionBy(args, recipe.ingredients, 'name'));
          if (_.isEqual(matchingIngredientsCount, _.size(args))) {
            recipesFiltered.push(recipe);
          }
        }
      });
    }

    if (_.size(args) !== 0) {
      console.log(recipesFiltered);
      return recipesFiltered
    } else {
      return recipes
    }
  }

  }
