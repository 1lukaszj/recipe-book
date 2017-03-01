import {RecipeBookPage} from "./app.po";

describe('recipe-book App', function () {
  let page: RecipeBookPage;

  beforeEach(() => {
    page = new RecipeBookPage();
  });

  RecipeBookPage.navigateToMain();

  it('1. Nav bar should display Recipe Book', () => {
    expect(RecipeBookPage.navBarBrand.getText()).toEqual('Recipe book');
  });

  it('2. Check if clicking on first recipe displays its details', () => {
    RecipeBookPage.recipeListItems.count().then((arr) => {
        if (arr > 0) {
          RecipeBookPage.recipeListItems.first().click();
          expect(RecipeBookPage.selectedRecipeDetails.isPresent()).toBeTruthy();
        }
      }
    );
  });

  it('3. Check if clicking on first recipe displays a non empty name', () => {
    RecipeBookPage.recipeListItems.count().then((arr) => {
        if (arr > 0) {
          expect(RecipeBookPage.selectedRecipeName.getText()).not.toBeNull();
        }
      }
    );
  });

  it('4. Click on New Recipe button and check that recipe edit component is loaded', () => {
      RecipeBookPage.newRecipeButton.click();
      expect(RecipeBookPage.recipeEdit.isPresent()).toBeTruthy();
    }
  );

  it('5. Click on Shopping List and check that Shopping list add component is loaded', () => {
      RecipeBookPage.shoppingListButton.click();
      expect(RecipeBookPage.shoppingListAdd.isPresent()).toBeTruthy();
    }
  );


});
