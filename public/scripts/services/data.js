(function(){
  'use strict'

  angular.module('app')
  .service('dataService', function($http) {
    let baseURL = 'http://localhost:5000';
    function getData (callback, url) {
      $http.get(`${baseURL}/${url}`)
      .then(callback);
    };
    this.getRecipes = (callback) => {
      getData(callback, `api/recipes`);
    };
    this.getCategories = (callback) => {
      getData(callback, 'api/categories');
    };
    this.getFoodItems = (callback) => {
      getData(callback, 'api/fooditems');
    };
    this.getRecipesOf = (callback, category) => {
      getData(callback, `api/recipes?category=${category}`);
    };
    this.getRecipe = (callback, id) => {
      getData(callback, `api/recipes/${id}`)
    };
    this.updateRecipe = (callback, data) => {
      $http.put(`${baseURL}/api/recipes/${data._id}`, data)
      .then(callback);
    };
    this.addRecipe = (callback, data) => {
      $http.post(`${baseURL}/api/recipes`, data)
      .then(callback);
    };
    this.deleteRecipe = (callback, id) => {
      $http.delete(`${baseURL}/api/recipes/${id}`)
      .then(callback);
    }
  });
})();
