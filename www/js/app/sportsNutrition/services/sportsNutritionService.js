'use strict';

angular.module('mainApp').factory('sportsNutritionService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + 'sports-nutrition/sample-products', {}, {});
		     }
		     this.getProductById = function () {
		         return $resource(API_SERVER + 'sports-nutrition-product', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'sports-nutrition/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'sports-nutrition/search-products', {}, {});
		     }
		     this.countProducts = function () {
		         return $resource(API_SERVER + 'sports-nutrition-count', {}, {});
		     }
		     return this;		     
		 }]);