import {browser, element, by, ElementFinder, ElementArrayFinder} from 'protractor';

export class RecipeBookPage {
  static navigateToMain() {
    return browser.get('/');
  }

  static sleep(milliseconds: number) {
    browser.sleep(milliseconds);
  }

  static get navBarBrand(): ElementFinder {
    return element(by.css('a.navbar-brand'));
  }

  static get recipeListItems(): ElementArrayFinder {
    return element.all(by.tagName('rb-recipe-item'));
  }

  static get selectedRecipeDetails(): ElementFinder {
    return element(by.tagName('rb-recipe-detail'));
  }

  static get selectedRecipeName(): ElementFinder {
    return this.selectedRecipeDetails.element(by.tagName('h1'));
  }

  static get shoppingListButton(): ElementFinder {
    return element(by.linkText('Shopping List'));
  }

  static get newRecipeButton(): ElementFinder {
    return element(by.linkText('New Recipe'));
  }

  static get shoppingListAdd(): ElementFinder {
    return element(by.tagName('rb-shopping-list-add'));
  }

  static get recipeEdit(): ElementFinder {
    return element(by.tagName('rb-recipe-edit'));
  }

}
