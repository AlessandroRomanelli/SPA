(function() {
  'use strict'

  angular.module('app')
  .controller('RecipesController', function ($scope, dataService, $location) {
    dataService.getRecipes((response) => {
      $scope.recipes = response.data;
    });

    dataService.getCategories((response) => {
      $scope.categories = response.data;
    });

    $scope.updateRecipes = function(category) {
      dataService.getRecipesOf((response) => {
        $scope.recipes = response.data
      }, category);
    };

    $scope.addRecipe = function() {
      let newRecipe = {
        name: "New Recipe",
        description: "",
        category: "",
        prepTime: "",
        cookTime: "",
        ingredients: [],
        steps: []
      }
      dataService.addRecipe((response) => {
        $scope.recipes.unshift(response.data);
      }, newRecipe);
      $location.path('/add');
    }


    $scope.deleteRecipe = function(i, recipeID) {
      dataService.deleteRecipe((response) => {
        if (!response.error) {
          console.log("Data deleted");
        };
      }, recipeID)
      $scope.recipes.splice(i, 1);
    }

    $scope.confirmAction = function(callback) {
      let r = confirm("Are you sure? \nThis recipe will be permanently deleted from the database.");
      if (r == true) {
        callback;
      }
    }

    $scope.isEmpty = function(array){
      return (!array || array.length == 0);
    }
  })

  .controller('RecipeDetailController', function ($scope, dataService, $location) {
    $scope.return = function() {
      $location.path('../');
    }

    $scope.isNew = function() {
      if ($location.path().search('add') == -1) {
        return false;
      } else {
        return true;
      }
    }

    $scope.saveRecipe = function (data) {
      dataService.updateRecipe((response) => {
        console.log(response.data);
        $location.path('/');
      }, data)
    }

    $scope.addIngredient = function() {
      let newIngredient = {
        foodItem: "",
        condition: "",
        amount: ""
      }
      $scope.recipe.ingredients.push(newIngredient);
    };

    $scope.deleteIngredient = function(i) {
      $scope.recipe.ingredients.splice(i, 1);
    };

    $scope.addStep = function(){
      let newStep = {
        description: ""
      }
      $scope.recipe.steps.push(newStep);
    };

    $scope.deleteStep = function(i) {
      $scope.recipe.steps.splice(i, 1);
    }

    dataService.getRecipe((response) => {
      $scope.recipe = response.data;
    }, $location.path().slice(5));

    dataService.getCategories((response) => {
      $scope.categories = response.data;
    });

    dataService.getFoodItems((response) => {
      $scope.foodItems = response.data;
    });
  });
})();
