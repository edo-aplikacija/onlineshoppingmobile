'use strict';

angular.module('mainApp').factory('petSuppliesCategoryService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {

		     this.getMostSelling = function () {
		         return $resource(API_SERVER + '/pet-supplies-category/sample-products', {}, {});
		     }
		     this.getBrands = function () {
		         return $resource(API_SERVER + 'pet-supplies-category/search-brands', {}, {});
		     }
		     this.getTotalProducts = function () {
		         return $resource(API_SERVER + 'pet-supplies-category/search-total-products', {}, {});
		     }
		     this.getProductDataBySearch = function () {
		         return $resource(API_SERVER + 'pet-supplies-category/search-products', {}, {});
		     }

		     return this;
		 }]);