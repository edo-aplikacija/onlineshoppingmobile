'use strict';

angular.module('mainApp').factory('sportsNutritionCategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/sports-nutrition-category/sample-products', {}, {});
		     }
		     this.getBrands = function () {
		         return $resource(API_SERVER + 'sports-nutrition-category/search-brands', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'sports-nutrition-category/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'sports-nutrition-category/search-products', {}, {});
		     }

		     return this;
		 }]);