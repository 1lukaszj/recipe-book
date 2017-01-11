import {Component, Input, trigger, state, style, transition, animate} from "@angular/core";

import {Recipe} from '../recipe';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: 'recipe-item.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(400, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class RecipeItemComponent {
 @Input() recipe: Recipe;
 @Input() recipeId: number;

}
